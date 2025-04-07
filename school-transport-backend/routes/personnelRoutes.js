// routes/personnelRoutes.js
import express from 'express';
import Personnel from '../models/Personnel.js';

const router = express.Router();

// GET all personnel
router.get('/', async (req, res) => {
  try {
    const data = await Personnel.find().populate('busId');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new personnel
router.post('/', async (req, res) => {
  try {
    const newEntry = new Personnel(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update personnel
router.put('/:id', async (req, res) => {
  try {
    const updated = await Personnel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE personnel
router.delete('/:id', async (req, res) => {
  try {
    await Personnel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
