import mongoose from 'mongoose';

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

const routeSchema = new mongoose.Schema({
  routeNumber: { type: String, required: true, unique: true },
  startingPoint: { type: String, required: true },
  endingPoint: { type: String, required: true },
  intermediateStops: [String],
  stops: [stopSchema],
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

export default mongoose.model('Route', routeSchema);
