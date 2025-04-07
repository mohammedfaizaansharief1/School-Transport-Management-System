// models/Bus.js
// const mongoose = require('mongoose');
import mongoose from 'mongoose';


const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true,
  },
  routeNumber: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
}, { timestamps: true });

// module.exports = mongoose.model('Bus', busSchema);
const Bus = mongoose.model('Bus', busSchema);
export default Bus;

