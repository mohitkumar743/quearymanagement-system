const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserRoutes = require('./routes/userRoutes');
const QueryRoutes = require('./routes/queryRoutes');
const sendMail = require('./routes/sendmail')
require("dotenv").config();


const app = express();
const port = process.env.PORT || 5020;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGOSTRING)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
// this route is for queary related api
app.use('/api/queary', QueryRoutes);
app.get("/", (req, res) => res.send("Express on Vercel"));
// this route is for user related api
app.use('/api/user',UserRoutes);
app.use('/sendMail',sendMail);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
