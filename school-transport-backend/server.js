// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import busRoutes from './routes/busRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
import personnelRoutes from './routes/personnelRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js'; 

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/routes', routeRoutes);


// Connect to MongoDB  // MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Error:', err));

// API Routes
app.use('/api/buses', busRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/personnel', personnelRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/registrations', registrationRoutes); 

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
