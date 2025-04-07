import express from 'express';
import Route from '../models/Route.js';

const router = express.Router();

// GET all routes
router.get('/', async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch routes' });
  }
});

// POST a new route
router.post('/', async (req, res) => {
  try {
    const newRoute = new Route(req.body);
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (error) {
    // res.status(400).json({ error: 'Failed to create route' });
    res.status(500).json({ error: error.message });
  }
});

// PUT update a route
router.put('/:id', async (req, res) => {
  try {
    const updated = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update route' });
  }
});

// DELETE a route
router.delete('/:id', async (req, res) => {
  try {
    await Route.findByIdAndDelete(req.params.id);
    res.json({ message: 'Route deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete route' });
  }
});

export default router;
