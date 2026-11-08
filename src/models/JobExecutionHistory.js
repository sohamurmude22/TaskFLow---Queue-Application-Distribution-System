const mongoose = require('mongoose');

const jobExecutionHistorySchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  workerId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['SUCCESS', 'FAILED'],
    required: true,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  errorMessage: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('JobExecutionHistory', jobExecutionHistorySchema);
