const mongoose = require('mongoose');
// it is used to create user schema
const UserSchema = new mongoose.Schema({
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
  const Users=mongoose.model('User',UserSchema)
  module.exports = Users;
  