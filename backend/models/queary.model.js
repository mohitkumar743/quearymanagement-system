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
      default: "open",
    },
  },{timestamps: true }
)

const Quearies = mongoose.model("Query", QuerySchema);
module.exports = Quearies;
