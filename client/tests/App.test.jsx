import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import App from '../src/App';
import { itemToBag } from '../src/utils';
import { userInfo } from './testUserInfo';
import UserProvider from '../src/components/UserContext';

global.fetch = vi.fn();

describe('App', () => {
    test('should render on page', () => {
        render(
            <UserProvider>
                <App />
            </UserProvider>
        );

        const divElement = screen.getByTestId('div');
        expect(divElement).toBeInTheDocument();
    });

    test('should update data with PUT method', async () => {
        render(
            <UserProvider>
                <App />
            </UserProvider>
        );

        await itemToBag(userInfo);

        expect(global.fetch).toHaveBeenCalledWith(
            `http://localhost:5200/api/v1/users/${userInfo.username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...userInfo})
        });
    });

    test('should display HomePage component', () => {
        render(
            <UserProvider>
                <App />
            </UserProvider>
        );

        const divElement = screen.getByTestId('scroller');
        expect(divElement).toBeInTheDocument();
    });

    test('should display ProductSection component', async () => {
        render(
            <UserProvider>
                <App />
            </UserProvider>
        );

        const buttonElement = screen.getByText(/hats/i);
        fireEvent.click(buttonElement);
        
        const childComponent = await screen.findAllByText(/add to bag/i);        
        childComponent.forEach((child) => {
            expect(child).toBeInTheDocument()
        });
    });

    test('should display SignIn component', async () => {
        render(
            <UserProvider>
                <App />
            </UserProvider>
        );

        const buttonElement = screen.getByTestId('bag');
        fireEvent.click(buttonElement);

        const logInElement = await screen.findByText(/Log in/i);
        expect(logInElement).toBeInTheDocument();
    });
});

