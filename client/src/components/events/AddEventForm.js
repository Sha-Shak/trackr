import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import ApiClientService from '../../services/ApiClientService';

function AddEventForm({ setEvents, events, getUserEvents }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const jobId = useParams();
  // const nameEventRef = useRef(null);
  // const decriptionEventRef = useRef(null);
  // const startDateEventRef = useRef(null);
  // const endDateEventRef = useRef(null);
  // // const startTimeEventRef = useRef(null);
  // // const endTimeEventRef = useRef(null);
  // const locationEventRef = useRef(null);

  function submitEvent(e) {
    e.preventDefault();
    // atcb_action({
    //   name: String(nameEventRef),
    //   description: String(decriptionEventRef),
    //   startDate: '2022-10-14',
    //   endDate: '2022-10-18',
    //   options: [
    //     'Apple',
    //     'Google',
    //     'iCal',
    //     'Microsoft365',
    //     'Outlook.com',
    //     'Yahoo',
    //   ],
    //   iCalFileName: 'Reminder-Event',
    // });
    console.log({
      jobId,
      name,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      jobId: jobId.id,
      name,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
    };
    console.log(data);
    await ApiClientService.addEvent(data);
    setEvents((prev) => [...prev, data]);
    event.target.reset();
  }

  function handleStartDateChange(e) {
    setStartDate(new Date(e.target.value).toISOString().slice(0, 10));
    setStartTime(new Date(e.target.value).toISOString().slice(11, 16));
  }
  function handleEndDateChange(e) {
    setEndDate(new Date(e.target.value).toISOString().slice(0, 10));
    setEndTime(new Date(e.target.value).toISOString().slice(11, 16));
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLocationChange(e) {
    setLocation(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  const minStartDate = new Date().toISOString().slice(0, 16);

  return (
    <>
      {/* <form onSubmit={(e) => submitEvent(e)}> */}
      <div className='form-box'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <fieldset>
            <label className='form-label' htmlFor='name'>
              Event Title
            </label>
            <input
              id='name'
              placeholder='Event title...'
              // ref={nameEventRef}
              onChange={handleNameChange}
              className='form-input'
              required
            />
          </fieldset>
          <fieldset>
            <label className='form-label' htmlFor='decription'>
              Description
            </label>
            <input
              id='description'
              placeholder='Decription...'
              className='form-input'
              // ref={decriptionEventRef}
              onChange={handleDescriptionChange}
              required
            />
          </fieldset>
          <fieldset>
            <label className='form-label' htmlFor='location'>
              Location
            </label>

            <input
              id='location'
              placeholder='Location...'
              className='form-input'
              // ref={locationEventRef}
              onChange={handleLocationChange}
              required
            />
          </fieldset>
          <fieldset>
            <label className='form-label' htmlFor='startDateTime'>
              Start Date & Time
            </label>
            <input
              id='startDateTime'
              type='datetime-local'
              className='form-input'
              // ref={startDateEventRef}
              min={minStartDate}
              onChange={handleStartDateChange}
              required
            />
          </fieldset>
          <fieldset>
            <label className='form-label' htmlFor='endDateTime'>
              End Date & Time
            </label>
            <input
              id='endDateTime'
              type='datetime-local'
              className='form-input'
              // ref={endDateEventRef}
              onChange={handleEndDateChange}
              min={startDate ? `${startDate}T${startTime}` : minStartDate}
              required
            />
          </fieldset>
          <input type='submit' value='Save' className='btn' />
        </form>
      </div>
    </>
  );
}

export default AddEventForm;
