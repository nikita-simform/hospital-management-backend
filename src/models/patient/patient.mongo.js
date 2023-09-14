const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  middleName: {
    type: String,
    maxlength: 32,
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: 32,
    trim: true,
  },
  age: {
    type: Number,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
  },
  id: String
});

module.exports = mongoose.model("Patient", patientSchema);
