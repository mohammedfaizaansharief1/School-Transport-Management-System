import express from 'express';
import StudentRegistration from '../models/StudentRegistration.js';

const router = express.Router();

// GET all registrations
router.get('/', async (req, res) => {
  try {
    const students = await StudentRegistration.find().populate('routePreference');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new registration
router.post('/', async (req, res) => {
  try {
    const student = new StudentRegistration(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update a registration
router.put('/:id', async (req, res) => {
  try {
    const updated = await StudentRegistration.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a registration
router.delete('/:id', async (req, res) => {
  try {
    await StudentRegistration.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student registration deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
