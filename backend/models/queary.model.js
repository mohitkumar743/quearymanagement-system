const mongoose = require("mongoose");
//it is used for queary schema
const QuerySchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    MobileNumber: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ticketNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      // enum: ["open", "in-progress", "closed"],
      default: "open",
    },
  },{timestamps: true }
)

const Quearies = mongoose.model("Query", QuerySchema);
module.exports = Quearies;
// export const Quearies = mongoose.model("Query", QuerySchema);

// // // it is used to create user schema
// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   phoneno: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model("User", UserSchema);

// module.exports = mongoose.model('Query', QuerySchema);
// {
//   "name":"amit",
//   "username":"amit123",
//   "phoneno":5252858536,
//   "email":"amit@gmail.com",
//   "password":"amit123"
// }
