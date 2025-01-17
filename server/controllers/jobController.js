const jobModel = require('../models/jobModel');

const getJobs = async (req, res) => {
  try {
    jobs = await jobModel.getAll(req.params);
    res.status(200).send(jobs);
  } catch (error) {
    console.log('Error in getJobs', error);
    res.status(500);
  }
};

const createNewJob = async (req, res) => {
  try {
    await jobModel.setOne(req.body);
    res.status(201).send('ok');
  } catch (error) {
    console.log('Error in createNewJob', error);
    res.status(500);
  }
};

const deleteJob = async (req, res) => {
  try {
    await jobModel.deleteOne(req.params.id);
    res.status(204).send('Deleted Job');
  } catch (error) {
    console.log('Error in deleteJob', error);
    res.status(500);
  }
};

const updateJob = async (req, res) => {
  try {
    const updated = await jobModel.updateOne(req.params.id, req.body);
    // console.log(updated);
    res.status(200).send(updated);
  } catch (error) {
    console.log('Error in updateJob', error);
    res.status(500);
  }
};

module.exports = { getJobs, createNewJob, deleteJob, updateJob };
