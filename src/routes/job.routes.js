const express = require('express');
const {
  createJob,
  getJobs,
  getJobById,
  cancelJob,
} = require('../controllers/job.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// All job routes require authentication
router.use(protect);

router.post('/', createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.delete('/:id', cancelJob);

module.exports = router;
