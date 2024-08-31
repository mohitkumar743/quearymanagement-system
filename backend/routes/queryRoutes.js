const express = require('express');

const router = express.Router();
const Quearies = require('../models/queary.model');

//tiket number generate
function generateTicketNumber() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}




// ---------------------------- queary related routes ------------------------------------------
// ******************************all queary show here******************************
router.get('/allqueries', async (req, res) => {
  try {
    const Queries = await Quearies.find();
    console.log(Queries)
    res.json(Queries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//  ******************************get all quearies by  mobile number******************************
router.get('/queries/:mobileNumber', async (req, res) => {
  try {
    const mobileNumber = req.params.mobileNumber;
    const queries = await Quearies.find({ MobileNumber: mobileNumber });
    if (queries.length === 0) {
      return res.status(404).json({ message: 'No queries found for this MobileNumber' });
    }
    res.json(queries);
  } catch (err) {
    console.error('Error fetching queries:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ******************************find quearies  by tikit no******************************
router.get('/findbytiket/:tiketno', async (req, res) => {
  try {
    const tiketNumber = req.params.tiketno;
    const queries = await Quearies.find({ticketNumber: tiketNumber });
    if (queries.length == 0) {
      return res.status(404).json({ message: 'No queries found for this tiket no' });
      // res.json(queries);
    }else{

      res.json(queries);
    }
  } catch (err) {
    return res.json({ message: 'No queries found for this tiket NO' });

    // console.log('Error fetching queries:', err.message);
    // res.status(500).json({ message: 'Server error' });
  }
});


// ******************************Create a new query******************************
router.post('/newqueary', async (req, res) => {
  const ticketNumber = generateTicketNumber();
  const query = new Quearies({
    Name:req.body.Name,
    email:req.body.email,
    MobileNumber:req.body.MobileNumber,
    title: req.body.title,
    description: req.body.description,
    ticketNumber
  });
  try {
    const newQuery = await query.save();
    res.status(201).json({ message: 'Query registered successfully', ticketNumber });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ******************************Update a query******************************
router.put('/editqueries/:tiketno', async (req, res) => {


  try {
    const tiketNumber = req.params.tiketno;
    const queries = await Quearies.find({ticketNumber: tiketNumber });
    console.log(tiketNumber)
    if (queries.length === 0) {
      return res.status(404).json({ message: 'No queries found for this tiket no' });
    }
    
    const updatedQueries = await Promise.all(
      queries.map(async (query) => {
        query.status = req.body.status;
        return await query.save(); // Save each updated query
      })
      
    );
    res.json(updatedQueries);

   
  } catch (err) {
    console.error('Error fetching queries:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

//  ******************************Delete query by id******************************
router.delete('/queries/:id', async (req, res) => {
  try {
    const query = await Quearies.findByIdAndDelete(req.params.id);

    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }

    res.json({ message: 'Query deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


