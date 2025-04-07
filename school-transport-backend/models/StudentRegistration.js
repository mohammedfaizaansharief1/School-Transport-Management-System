import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  boardingPoint: { type: String, required: true },
  routePreference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
  },
  feeAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending'],
    default: 'Pending'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const StudentRegistration = mongoose.model('StudentRegistration', studentSchema);
export default StudentRegistration;
