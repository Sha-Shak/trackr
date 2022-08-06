import { expect, it, jest } from "@jest/globals";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JobInfo from "../components/jobs/JobInfo";
import { jobs } from '../test/mocksDatas/jobMock';
it('fields should be disabled', async () => {
  const getUserJobs = jest.fn()
  const setJobs= jest.fn()
  render(<JobInfo jobs={jobs} setJobs={setJobs} getUserJobs={getUserJobs} />); 
  const jobInput = screen.getByTestId('title')
  const companyInput = screen.getByTestId('company')
  const salaryInput = screen.getByTestId("salary");
  const locationInput =screen.getByTestId("location");
  const urlInput = screen.getByTestId("post_url");
  const descriptionInput = screen.getByTestId("description");
  const noteInput = screen.getByTestId("notes");
  const selectInput =  screen.getByTestId("status");  
  
  expect(jobInput).toHaveAttribute('disabled');
  expect(companyInput).toHaveAttribute('disabled');
  expect(salaryInput).toHaveAttribute('disabled');
  expect(locationInput).toHaveAttribute('disabled');
  expect(urlInput).toHaveAttribute('disabled');
  expect(descriptionInput).toHaveAttribute('disabled');
  expect(noteInput).toHaveAttribute('disabled');
  expect(selectInput).toHaveAttribute('disabled');

})
it("should render edit button",()=>{
   const getUserJobs = jest.fn()
  const setJobs= jest.fn()
  render(<JobInfo jobs={jobs} setJobs={setJobs} getUserJobs={getUserJobs} />); 
  const editBtn = screen.getByRole('button', {name: /Edit/i})
  expect(editBtn).toBeInTheDocument()
})
it("should render cancel and save button", async ()=>{
   const getUserJobs = jest.fn()
  const setJobs= jest.fn()
  render(<JobInfo jobs={jobs} setJobs={setJobs} getUserJobs={getUserJobs} />); 
  const editBtn = screen.getByRole('button', {name: /Edit/i})
   await userEvent.click(editBtn);
  const cancelBtn = screen.getByRole('button', {name: /Cancel/i})
  const saveBtn = screen.getByRole('button', {name: /Save/i})
  
  expect(cancelBtn).toBeInTheDocument()
  expect(saveBtn).toBeInTheDocument()
})
