import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect } from 'vitest';
import SignIn from '../src/components/ShowLogIn';
import { UserContext } from '../src/components/UserContext';

let signedInUserInfo;

beforeEach(() => {
    signedInUserInfo = {
        username: 'user',
        password: 'password',
        items: [
            { name: 'Item 1', value: 10.00, quantity: 1, link: 'link1' },
            { name: 'Item 2', value: 15.00, quantity: 2, link: 'link2' }
        ],
        total: 40.00
    };
});

describe('SignIn', () => {
    test('should render LogIn component', () => {
        render(
            <UserContext.Provider value={{ signedInUserInfo }}>
                <SignIn />
            </UserContext.Provider>
        );

        const logInElement = screen.getByTestId('logInDiv');
        expect(logInElement).toBeInTheDocument();
    });

    test('should render SignUp component', async () => {
        render(
            <UserContext.Provider value={{ signedInUserInfo }}>
                <SignIn />
            </UserContext.Provider>
        );

        const buttonElement = screen.getByTestId('span');
        expect(buttonElement).toBeInTheDocument();

        fireEvent.click(buttonElement);

        const signUpElement = await screen.findByTestId('signUpDiv');
        expect(signUpElement).toBeInTheDocument();
    });
});