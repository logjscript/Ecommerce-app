import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect } from 'vitest';
import SignIn from '../src/components/SignIn';
import { userInfo } from './testUserInfo';

describe('SignIn', () => {
    test('should render LogIn component', () => {
        render(<SignIn userInfo={userInfo} />);

        const logInElement = screen.getByTestId('logInDiv');
        expect(logInElement).toBeInTheDocument();
    });

    test('should render SignUp component', async () => {
        render(<SignIn userInfo={userInfo} signedInFunc={() => true} canceledFunc={() => true} />);

        const buttonElement = screen.getByTestId('span');
        expect(buttonElement).toBeInTheDocument();

        fireEvent.click(buttonElement);

        const signUpElement = await screen.findByTestId('signUpDiv');
        expect(signUpElement).toBeInTheDocument();
    });
});