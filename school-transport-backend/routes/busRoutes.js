// routes/busRoutes.js

import express from 'express';
const router = express.Router();
// const Bus = require('../models/Bus');
import Bus from '../models/Bus.js';


// Get all buses
router.get('/', async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new bus
router.post('/', async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    const savedBus = await newBus.save();
    res.status(201).json(savedBus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update bus by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete bus by ID
router.delete('/:id', async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// module.exports = router;
export default router
