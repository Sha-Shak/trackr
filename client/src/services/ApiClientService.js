const baseUrl = process.env.REACT_APP_BASE_URL;

async function getJobs(user) {
  try {
    const jobs = await fetch(`${baseUrl}/jobs/${user.uid}`, {
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    });
    return jobs.json();
  } catch (error) {
    console.log('GET request error', error);
  }
}

async function addJob(data, user) {
  try {
    const newJob = await fetch(`${baseUrl}/jobs/${data.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
      },
      body: JSON.stringify(data),  
    });
    const response = await newJob.json();
    return response;

  } catch (error) {
    console.log('POST request error', error);
  }
}

async function editJob(data) {
  try {
    const editData = await fetch(`${baseUrl}/jobs/${data._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await editData.json();
  } catch (error) {
    console.log('PUT request error', error);
  }
}

async function deleteJob(id, user) {
  try {
    const response = await fetch(`${baseUrl}/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.accessToken,
      },
    });
    //const res = await response.json();
    console.log(response.ok)
    return response.ok
    // return res;
  } catch (error) {
    console.log('DELETE request error', error);
    return false;
   
  }
}

async function getEvents(user) {
  try {
    const events = await fetch(`${baseUrl}/events/${user.uid}`, {
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    });
    return events.json();
  } catch (error) {
    console.log('GET request error', error);
  }
}

async function addEvent(data, user) {
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

async function deleteEvent(id, user) {
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

module.exports = {
  getJobs,
  addJob,
  editJob,
  deleteJob,
  getEvents,
  addEvent,
  deleteEvent,
};
