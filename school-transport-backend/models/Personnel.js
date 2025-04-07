// models/Personnel.js
import mongoose from 'mongoose';

const personnelSchema = new mongoose.Schema({
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true
  },
  driver: {
    name: String,
    contactNumber: String,
    licenseDetails: String
  },
  cleaner: {
    name: String,
    contactNumber: String
  },
  incharge: {
    name: String,
    contactNumber: String,
    email: String
  }
}, { timestamps: true });

const Personnel = mongoose.model('Personnel', personnelSchema);
export default Personnel;
