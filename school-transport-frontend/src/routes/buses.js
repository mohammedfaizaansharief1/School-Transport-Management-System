// routes/buses.js

const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// Get all buses
router.get('/', async (req, res) => {
  const buses = await Bus.find();
  res.json(buses);
});

// Add a new bus
router.post('/', async (req, res) => {
  const bus = new Bus(req.body);
  await bus.save();
  res.json(bus);
});

// Update a bus
router.put('/:id', async (req, res) => {
  const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBus);
});

// Delete a bus
router.delete('/:id', async (req, res) => {
  await Bus.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
