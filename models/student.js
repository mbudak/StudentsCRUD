const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let studentModel = new Schema(
    {
      name: {
        type: String
      },
      age: {
        type: Number
      },
      email: {
        type: String
      },
      avatar: {
        type: String
      }
    },
    { collection: "Students" }
  );

  module.exports = mongoose.model("students", studentModel);