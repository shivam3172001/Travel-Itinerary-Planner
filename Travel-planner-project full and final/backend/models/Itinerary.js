const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    trim: true
  },
  latitude: {
    type: Number,
    default: null
  },
  longitude: {
    type: Number,
    default: null
  }
});

const itinerarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  destinations: [destinationSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Itinerary', itinerarySchema);