import LogIn from "../components/auth/LogIn";
import { render, screen } from '@testing-library/react';
import { toBeDisabled } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'; 
import { act } from "react-dom/test-utils";



jest.mock('../components/context/AuthContext', () => ({
  useAuth: () => ({login: () => console.log('login')})
}))

it('should call setLoading with true after login', async () => {

  act(() => {
    render(<LogIn />); 
  });


  const emailInput = screen.getByPlaceholderText(/Email/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  const submit = screen.getByRole('button', {name: /Log in/i});

  userEvent.type(emailInput, 'test@gmail.com');
  userEvent.type(passwordInput, 'test123');

  await userEvent.click(submit);

  //expect((submit).getAttribute('disabled')).toBe(null);

  expect(submit).toBeDisabled();
})