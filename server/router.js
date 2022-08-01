const router = require('express').Router();
const {
  getJobs,
  createNewJob,
  deleteJob,
  updateJob,
} = require('./controllers/jobController');
const {
  getEvents,
  createNewEvent,
  deleteEvent,
  updateEvent,
} = require('./controllers/eventController');

// Routes for jobs
router.get('/jobs/:userId', getJobs);
router.post('/jobs/:userId', createNewJob);
router.delete('/jobs/:id', deleteJob);
router.put('/jobs/:id', updateJob);

// Router for events
router.get('/events', getEvents);
router.post('/events/:jobId', createNewEvent);
router.delete('/events/:jobId/:id', deleteEvent);
router.put('/events/:jobId/:id', updateEvent);

module.exports = router;
