const mongoose = require('mongoose');
// it is used to create Admin schema
const AdminSchema = new mongoose.Schema({
  Name: { 
      type: String,
       required: true
       },
  UserName:
     { 
       type: String,
       required: true,
      },
  MobileNumber:
     { 
       type: Number,
       required: true,
      },
  email:
     { 
       type: String,
       required: true,
      },
  password:
     { 
       type: String,
       required: true
      },
  },{timestamps : true}
);
  const Admin=mongoose.model('Admin',AdminSchema)
  module.exports = Admin;
  