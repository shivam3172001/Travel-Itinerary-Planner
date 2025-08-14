const express = require('express');
const { body, validationResult } = require('express-validator');
const Itinerary = require('../models/Itinerary');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all itineraries for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new itinerary
router.post('/', auth, [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('destinations').isArray({ min: 1 }).withMessage('At least one destination is required'),
  body('destinations.*.location').trim().isLength({ min: 1 }).withMessage('Location is required'),
  body('destinations.*.startDate').isISO8601().withMessage('Valid start date is required'),
  body('destinations.*.endDate').isISO8601().withMessage('Valid end date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { title, destinations } = req.body;

    const itinerary = new Itinerary({
      title,
      destinations,
      user: req.user._id
    });

    await itinerary.save();
    res.status(201).json(itinerary);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update itinerary
router.put('/:id', auth, [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('destinations').isArray({ min: 1 }).withMessage('At least one destination is required'),
  body('destinations.*.location').trim().isLength({ min: 1 }).withMessage('Location is required'),
  body('destinations.*.startDate').isISO8601().withMessage('Valid start date is required'),
  body('destinations.*.endDate').isISO8601().withMessage('Valid end date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { title, destinations } = req.body;
    
    const itinerary = await Itinerary.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, destinations },
      { new: true }
    );

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete itinerary
router.delete('/:id', auth, async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    await Itinerary.findByIdAndDelete(req.params.id);
    res.json({ message: 'Itinerary deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;