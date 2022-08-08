const express = require('express');
const router = require('../router');
const supertest = require('supertest');
const mongoose = require('mongoose');
const JobModel = require('../models/jobSchema');
const EventModel = require('../models/eventSchema');
const admin = require('../firebase-config/firebase-config');
const mock = require('./mocks/mock');
require('dotenv').config();

const databaseName = 'test';


describe('Integration tests', () => {
  const app = express();
  app.use(express.json());
  app.use(router);

  const request = supertest(app);

  let uid = null;
  let token = null;

  

  beforeAll(async () => {

    const dbURL = `mongodb://127.0.0.1:27017/${databaseName}`;
    await mongoose.connect(dbURL, {useNewUrlParser: true});

    const testUser = await admin.auth().getUserByEmail('test@example.com');

    uid = testUser.uid;

  })


  beforeEach(async () => {

    jest.setTimeout(20000);

    customToken = await admin.auth().createCustomToken(uid);

    const res = await fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=AIzaSyCB7fOgVmoZFw5kbvtVEazRpPYQFOSF1MQ`,
      {
        method: 'POST',
        body: JSON.stringify({
          token: customToken,
          returnSecureToken: true
        }),
        headers: {
          'Content-type': 'application/json'
        }
      });

      const tokenRes = await res.json();
      token = tokenRes.idToken;
  });


  afterEach(async () => {
    await JobModel.deleteMany();
    await EventModel.deleteMany();
  });



  describe('Job Routes', () => {
    it('should get jobs from the DB', async () => {
  
      const post1 = await request.post('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockJob);
  
      const post2 = await request.post('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockJob1);
  
  
      const res = await request.get('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token);
  
  
      expect(res.status).toBe(200);
      expect(res.body).toEqual([post1.body, post2.body]);
    })
  
  
  
    it('should save a job to the DB', async () => {
  
      const res = await request.post('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockJob)
  
      const job = await JobModel.findOne(mock.mockJob);
      expect(job.company).toBe(mock.mockJob.company);
      expect(job.title).toBe(mock.mockJob.title);
      expect(job.userId).toBe(mock.mockJob.userId);
      expect(job.location).toBe(mock.mockJob.location);
      expect(job.salary).toBe(mock.mockJob.salary);
      expect(job.post_url).toBe(mock.mockJob.post_url);
      expect(job.color).toBe(mock.mockJob.color);
      expect(res.status).toBe(201);
    })
  
  
    it('should delete a job on delete route', async () => {
  
      const post = await request.post('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockJob)
  
      const id = post.body._id;
  
      const post2 = await request.post('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockJob1);
  
  
      const deleteRes = await request.delete('/jobs/' + id, )
      .set('authorization', 'Bearer ' + token);
  
  
      const getRes = await request.get('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token);
  
      expect(deleteRes.status).toBe(204);
      expect(getRes.status).toBe(200);
      expect(getRes.body).toEqual([post2.body]);
    })
  
  
  
    it('should update a job on update route', async () => {
  
      const post = await request.post('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockJob)
  
      const id = post.body._id;
  
      const updateRes = await request.put('/jobs/' + id, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.updateFields);
  
  
      const getRes = await request.get('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token);
  
      expect(updateRes.status).toBe(200);
      expect(getRes.status).toBe(200);
  
      expect(getRes.body[0]._id).toEqual(id);
      expect(getRes.body[0].title).toEqual(mock.mockJobUpdate.title);
      expect(getRes.body[0].company).toEqual(mock.mockJobUpdate.company);
      expect(getRes.body[0].location).toEqual(mock.mockJobUpdate.location);
      expect(getRes.body[0].salary).toEqual(mock.mockJobUpdate.salary);
    })
  })


  describe('Event Routes', () => {

    it('should get events from the DB', async () => {
  
      await request.post('/events/' + mock.mockEvent.jobId, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockEvent);
  
      await request.post('/events/' + mock.mockEvent1.jobId, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockEvent1);
  
  
      const res = await request.get('/events/testUser123', )
      .set('authorization', 'Bearer ' + token);
  
  
      expect(res.status).toBe(200);
      expect(res.body[0].name).toEqual(mock.mockEvent.name);
      expect(res.body[0].location).toEqual(mock.mockEvent.location);
      expect(res.body[0].start_date).toEqual(mock.mockEvent.start_date);
      expect(res.body[1].name).toEqual(mock.mockEvent1.name);
      expect(res.body[1].location).toEqual(mock.mockEvent1.location);
      expect(res.body[1].start_date).toEqual(mock.mockEvent1.start_date);
    })


    it('should save an event to the DB', async () => {
  
      const res = await request.post('/events/' + mock.mockEvent.jobId, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockEvent);
  
      const event = await EventModel.findOne(mock.mockEvent);
      expect(event.jobId).toBe(mock.mockEvent.jobId);
      expect(event.name).toBe(mock.mockEvent.name);
      expect(event.userId).toBe(mock.mockEvent.userId);
      expect(event.location).toBe(mock.mockEvent.location);
      expect(event.desciption).toBe(mock.mockEvent.desciption);
      expect(event.start_date).toBe(mock.mockEvent.start_date);
      expect(event.end_date).toBe(mock.mockEvent.end_date);
      expect(event.start_time).toBe(mock.mockEvent.start_time);
      expect(event.end_time).toBe(mock.mockEvent.end_time);
      expect(res.status).toBe(201);
    })


    it('should delete an event on delete route', async () => {
  
      await request.post('/events/' + mock.mockEvent.jobId, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockEvent);

      const res = await request.get('/events/testUser123', )
      .set('authorization', 'Bearer ' + token);
  
      const id = res.body[0]._id;
  
      await request.post('/events/' + mock.mockEvent1.jobId, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockEvent1);
  
  
      const deleteRes = await request.delete('/events/' + id, )
      .set('authorization', 'Bearer ' + token);
  
  
      const getRes = await request.get('/events/testUser123', )
      .set('authorization', 'Bearer ' + token);
  
      expect(deleteRes.status).toBe(204);
      expect(getRes.status).toBe(200);
      expect(getRes.body.length).toEqual(1);
      expect(getRes.body[0].name).toEqual(mock.mockEvent1.name);
      expect(getRes.body[0].jobId).toEqual(mock.mockEvent1.jobId);
      expect(getRes.body[0].userId).toEqual(mock.mockEvent1.userId);
      expect(getRes.body[0].desciption).toEqual(mock.mockEvent1.desciption);
      expect(getRes.body[0].location).toEqual(mock.mockEvent1.location);


      //Need to return data back after post.
    })


    it('should update an event on update route', async () => {
  
      await request.post('/events/' + mock.mockEvent.jobId, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockEvent);

      const res = await request.get('/events/testUser123', )
      .set('authorization', 'Bearer ' + token);
  
      const id = res.body[0]._id;
  
      const updateRes = await request.put('/events/' + id, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.eventUpdateFields);
  
  
      const getRes = await request.get('/events/testUser123', )
      .set('authorization', 'Bearer ' + token);
  
      expect(updateRes.status).toBe(200);
      expect(getRes.status).toBe(200);
  
      expect(getRes.body[0]._id).toEqual(id);
      expect(getRes.body[0].name).toEqual(mock.mockEventUpdate.name);
      expect(getRes.body[0].jobId).toEqual(mock.mockEventUpdate.jobId);
      expect(getRes.body[0].location).toEqual(mock.mockEventUpdate.location);
      expect(getRes.body[0].userId).toEqual(mock.mockEventUpdate.userId);
      expect(getRes.body[0].start_date).toEqual(mock.mockEventUpdate.start_date);
      expect(getRes.body[0].end_date).toEqual(mock.mockEventUpdate.end_date);
    })
  
    
  })
})