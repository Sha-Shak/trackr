import { expect } from "@jest/globals";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateJob from "../components/jobs/CreateJob";

it('should clear fields when button clicked', async () => {
  const result = render(<CreateJob />); 
  const jobInput = result.container.querySelector("#title");
  const companyInput =  result.container.querySelector("#company");
  const salaryInput = result.container.querySelector("#salary");
  const locationInput =result.container.querySelector("#location");
  const urlInput = result.container.querySelector("post_url");
  const descriptionInput = result.container.querySelector("#description");
  const selectInput =  result.container.querySelector("#status");
  const submit = screen.getByRole('button', {name: /Add Job/i});
  //input
  userEvent.type(jobInput, 'SE');
  userEvent.type(companyInput, 'SEC');
  userEvent.type(salaryInput, 'SES');
  userEvent.type(locationInput, 'SEL');
  userEvent.type(descriptionInput, 'SED'); 
  userEvent.type(urlInput, 'https://URL.com');
  userEvent.selectOptions(selectInput, ['pending']);
  
  await userEvent.click(submit);

  const val = {
    jobVal: jobInput.value,
    companyVal : companyInput.value,
    salaryInput: salaryInput.value,
    locationInput:locationInput.value,
    descriptionInput: descriptionInput.value,
    selectInput: selectInput.value
  }


  const expectedVal = {
      jobVal: '',
      companyVal: '',
      salaryInput: '',
      locationInput: '',
      descriptionInput: '',
      selectInput: ''
    }

  console.log(val);
  
  expect(val).toEqual(expectedVal);
})