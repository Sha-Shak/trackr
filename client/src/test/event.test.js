import AddEventForm from "../components/events/AddEventForm";
import { render, screen } from '@testing-library/react';
import { toBeDisabled } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'; 
//import uuid from 'uuid';
//import { act } from "react-dom/test-utils";
import { AuthProvider } from '../components/context/AuthContext'

jest.mock('uuid')

const setEvents = jest.fn();
const getUserEvents = jest.fn();
const currentUser = {uid:'123'};

const events = [{
  jobId: '123',
  userId: '123',
  name: '123',
  description : '123',
  startDate: '123',
  endDate: '123',
  startTime : '123',
  endTime : '123',
  location : '123',
},{
  jobId: '1234',
  userId: '1234',
  name: '1234',
  description : '1234',
  startDate: '1234',
  endDate: '1234',
  startTime : '1234',
  endTime : '1234',
  location : '1234',
}]


// const MockAuthProvider = ()=>{
// <AuthProvider>
//   <AddEventForm events={events} setEvents={setEvents} getUserEvents={getUserEvents} currentUser={currentUser}/>
// </AuthProvider>
// }

//const {currentUser} = useAuth();

// jest.mock('../components/context/AuthContext', () => ({
//   useAuth: () => ({login: () => console.log('login')})
// }))



it('should set button to disabled after clicking', async () => {

  render(
    <AddEventForm events={events} setEvents={setEvents} getUserEvents={getUserEvents} currentUser={currentUser}/>
  // <MockAuthProvider />
); 



  const Event_Title = screen.getByTestId('event-title')
 // screen.debug(Event_Title);
  const Description = screen.getByPlaceholderText(/Decription/i);
  const Location = screen.getByPlaceholderText(/Location/i);
 // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
 // const StartDT =  utils.container.querySelector("#startDateTime");
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
// const EndDT =  utils.container.querySelector("#endDateTime");
  
// const StartDT = screen.getByPlaceholderText(/startDateTime/i);
//   const EndDT = screen.getByPlaceholderText(/endDateTime/i);
  const submit = screen.getByDisplayValue('Save');
  
  userEvent.type(Event_Title, 'test@gmail.com');
 // userEvent.type(StartDT, '2022-08-26T23:32');
 // userEvent.type(EndDT, 'test123');
// act( async ()=>{
   await userEvent.click(submit);
   expect(submit).toBeDisabled();
// })
  
  //expect((submit).getAttribute('disabled')).toBe(null);


})