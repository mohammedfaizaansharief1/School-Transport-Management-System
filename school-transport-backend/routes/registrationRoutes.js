// routes/registrationRoutes.js
import express from 'express';
import StudentRegistration from '../models/StudentRegistration.js';

const router = express.Router();

// POST a new student registration
router.post('/', async (req, res) => {
  try {
    const newRegistration = new StudentRegistration(req.body);
    await newRegistration.save();
    res.status(201).json(newRegistration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET all registrations
router.get('/', async (req, res) => {
  try {
    const registrations = await StudentRegistration.find().populate('routePreference');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// PUT (Edit) a student registration by ID
router.put('/:id', async (req, res) => {
    try {
      const updated = await StudentRegistration.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updated) return res.status(404).json({ error: 'Registration not found' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // DELETE a registration
router.delete('/:id', async (req, res) => {
    try {
      const deleted = await StudentRegistration.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Registration not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Delete failed' });
    }
  });

export default router;
