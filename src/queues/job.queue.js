const { Queue } = require('bullmq');
const redisConnection = require('../config/redis');

// Initialize BullMQ Queue
const jobQueue = new Queue('task-queue', {
  connection: redisConnection,
});

// Priority mapping: BullMQ uses 1 for highest, 2 for medium, 3 for low
const priorityMap = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

// Add job to BullMQ queue
const addJobToQueue = async (job) => {
  let delay = 0;
  if (job.scheduledAt) {
    const diff = new Date(job.scheduledAt).getTime() - Date.now();
    if (diff > 0) delay = diff;
  }

  const queueJob = await jobQueue.add(
    job.jobType,
    {
      mongoJobId: job._id.toString(),
      jobType: job.jobType,
      payload: job.payload,
    },
    {
      priority: priorityMap[job.priority] || 2,
      delay,
      attempts: job.maxAttempts || 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    }
  );

  return queueJob;
};

module.exports = {
  jobQueue,
  addJobToQueue,
};
