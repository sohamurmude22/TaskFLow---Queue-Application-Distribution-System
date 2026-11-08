const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jobType: {
    type: String,
    enum: ['EMAIL', 'REPORT'],
    required: true,
  },
  payload: {
    type: Object,
    default: {},
  },
  status: {
    type: String,
    enum: ['WAITING', 'ACTIVE', 'COMPLETED', 'FAILED', 'CANCELLED'],
    default: 'WAITING',
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'MEDIUM',
  },
  attempts: {
    type: Number,
    default: 0,
  },
  maxAttempts: {
    type: Number,
    default: 3,
  },
  scheduledAt: {
    type: Date,
    default: null,
  },
  queueJobId: {
    type: String,
    default: null,
  },
  result: {
    type: Object,
    default: null,
  },
  errorMessage: {
    type: String,
    default: null,
  },
  startedAt: {
    type: Date,
    default: null,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Job', jobSchema);
