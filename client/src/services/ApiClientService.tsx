import { Event } from "../event";
import { Job } from "../job";

const baseUrl = process.env.REACT_APP_BASE_URL;

async function getJobs (user: any) : Promise<Job[]> {

  let jobs : Response;

  try {
    jobs = await fetch(`${baseUrl}/jobs/${user.uid}`, {
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    });
  } catch (error) {
    console.log('GET request error', error);
    jobs = new Response(undefined);
  }

  return jobs.json();
}

async function addJob (data: Job, user: any) : Promise<Job> {

  let response : Response;

  try {
    response = await fetch(`${baseUrl}/jobs/${data.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
      },
      body: JSON.stringify(data),  
    });
    
  } catch (error) {
    console.log('POST request error', error);
    response = new Response(undefined);
  }

  return response.json();
}

async function editJob(data: Job) : Promise<Job | undefined> {

  let editData: Response;
  try {
    editData = await fetch(`${baseUrl}/jobs/${data._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log('PUT request error', error);
    editData = new Response(undefined);
  }

  return editData.json();
}

async function deleteJob(id: string, user: any) : Promise<Boolean> {

  let response : Response;

  try {
    response = await fetch(`${baseUrl}/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
      },
    });

    console.log(response.ok)
    return response.ok

  } catch (error) {
    console.log('DELETE request error', error);
    return false;
   
  }
}

async function getEvents(user:any) : Promise<Event> {
  let events : Response;

  try {
    events = await fetch(`${baseUrl}/events/${user.uid}`, {
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    });
  } catch (error) {
    console.log('GET request error', error);
    events = new Response(undefined);
  }

  return events.json();
}

async function addEvent(data:Event, user:any) {
  try {
    await fetch(`${baseUrl}/events/${data.jobId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log('POST request error', error);
  }
}

async function deleteEvent(id:string, user:any) {
  try {
    await fetch(`${baseUrl}/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
      },
    });
  } catch (error) {
    console.log('DELETE request error', error);
  }
}

export default  {
  getJobs,
  addJob,
  editJob,
  deleteJob,
  getEvents,
  addEvent,
  deleteEvent,
};
