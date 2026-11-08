const Job = require('../models/Job');
const { jobQueue, addJobToQueue } = require('../queues/job.queue');

// Create a new job
const createJob = async (req, res) => {
  try {
    const { jobType, payload, priority, scheduledAt } = req.body;

    if (!jobType) {
      return res.status(400).json({ success: false, message: 'jobType is required' });
    }

    // 1. Create in MongoDB
    const job = await Job.create({
      userId: req.user._id,
      jobType,
      payload: payload || {},
      priority: priority || 'MEDIUM',
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
    });

    // 2. Add to BullMQ Queue
    const queueJob = await addJobToQueue(job);

    // 3. Save queueJobId in MongoDB
    job.queueJobId = queueJob.id;
    await job.save();

    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all jobs for logged-in user
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.user._id });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel a pending job
const cancelJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.user._id });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.status !== 'WAITING') {
      return res.status(400).json({ success: false, message: 'Only WAITING jobs can be cancelled' });
    }

    // Remove from BullMQ queue if present
    if (job.queueJobId) {
      const queueJob = await jobQueue.getJob(job.queueJobId);
      if (queueJob) {
        await queueJob.remove();
      }
    }

    job.status = 'CANCELLED';
    await job.save();

    res.json({ success: true, message: 'Job cancelled successfully', job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  cancelJob,
};
