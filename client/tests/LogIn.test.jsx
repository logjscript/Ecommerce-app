import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import LogIn from '../src/components/LogIn';
import { fetchUsername } from '../src/utils';
import { UserContext } from '../src/components/UserContext';

vi.mock('../src/utils', ()=> {
    return {
        fetchUsername: vi.fn().mockImplementation((username) => {
            if (username === 'user') {
                mockSetSignedIn();
            } else {
                mockSetSignInError('username does not exist');
            }
        })
    }
});

const mockSetCanceled = vi.fn();
const mockSetUserInfo = vi.fn();
const mockSetSignedIn = vi.fn();
const mockSetSignInError = vi.fn();
const mockSetExistingAccount = vi.fn();

let userInfo;

beforeEach(() => {
    userInfo = {
        username: 'user',
        password: 'pass',
        items: [
            { name: 'Item 1', value: 10.00, quantity: 1, link: 'link1' },
            { name: 'Item 2', value: 15.00, quantity: 2, link: 'link2' }
        ],
        total: 40.00
    };
});

describe('LogIn', () => {
    test('should render on page', () => {
        render(
            <UserContext.Provider value={{ 
                setSignedIn: mockSetSignedIn, setCanceled: mockSetCanceled, 
                userInfo, setUserInfo: mockSetUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                />
            </UserContext.Provider>
        );

        const divElement = screen.getByTestId('logInDiv');
        expect(divElement).toBeInTheDocument();
    });

    test('should call setCanceled on button click', () => {
        render(
            <UserContext.Provider value={{ 
                setSignedIn: mockSetSignedIn, setCanceled: mockSetCanceled, 
                userInfo, setUserInfo: mockSetUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                />
            </UserContext.Provider>
        );

        const buttonElement = screen.getByText(/x/i);
        fireEvent.click(buttonElement);

        expect(mockSetCanceled).toHaveBeenCalledOnce();
    });

    test("should call setExistingAccount on 'click here' click event", () => {
        render(
            <UserContext.Provider value={{ 
                setSignedIn: mockSetSignedIn, setCanceled: mockSetCanceled, 
                userInfo, setUserInfo: mockSetUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                />
            </UserContext.Provider>
        );

        const spanElement = screen.getByText(/click here/i);
        fireEvent.click(spanElement);

        expect(mockSetExistingAccount).toHaveBeenCalledOnce();
    })

    test('should update username on change event', () => {
        render(
            <UserContext.Provider value={{ 
                setSignedIn: mockSetSignedIn, setCanceled: mockSetCanceled, 
                userInfo, setUserInfo: mockSetUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                />
            </UserContext.Provider>
        );

        const userInputElement = screen.getByPlaceholderText(/username/i);
        fireEvent.change(userInputElement, { target: { value: 'username'}});

        expect(mockSetUserInfo).toHaveBeenCalledWith({
            ...userInfo, 
            username: 'username'
        });
    });

    test('should update password on change event', () => {
        render(
            <UserContext.Provider value={{ 
                setSignedIn: mockSetSignedIn, setCanceled: mockSetCanceled, 
                userInfo, setUserInfo: mockSetUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                />
            </UserContext.Provider>
        );

        const userInputElement = screen.getByPlaceholderText(/password/i);
        fireEvent.change(userInputElement, { target: { value: 'password'}});

        expect(mockSetUserInfo).toHaveBeenCalledWith({
            ...userInfo, 
            password: 'password'
        });
    });

    test('should call fetchUsername on button click event', () => {
        render(
            <UserContext.Provider value={{ 
                setSignedIn: mockSetSignedIn, setCanceled: mockSetCanceled, 
                userInfo, setUserInfo: mockSetUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                />
            </UserContext.Provider>
        );

        const buttonElement = screen.getByText(/log in/i);
        fireEvent.click(buttonElement);

        expect(fetchUsername).toHaveBeenCalledOnce();
    });
    
    test('should run setSignedIn when username and password are correct', async () => {
        global.fetch = vi.fn(() => 
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    username: 'user', password: 'pass', items: [], total: 0 
                }),
            })
        );

        render(
            <UserContext.Provider value={{ 
                setSignedIn: mockSetSignedIn, setCanceled: mockSetCanceled, 
                userInfo, setUserInfo: mockSetUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                />
            </UserContext.Provider>
        );

        const response = await fetch('http://localhost:5200/api/v1/users/user');
        const data = await response.json();
        fetchUsername(data.username);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:5200/api/v1/users/user`);
        expect(mockSetSignedIn).toHaveBeenCalledOnce();
    });

    test('should not run setSignedIn when username or password is incorrect', async () => {
        global.fetch = vi.fn(() => 
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    username: 'notTheRightUser', password: 'notCorrectPass', items: [], total: 0 
                }),
            })
        );

        render(
            <UserContext.Provider value={{ 
                setSignedIn: mockSetSignedIn, setCanceled: mockSetCanceled, 
                userInfo, setUserInfo: mockSetUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                />
            </UserContext.Provider>
        );

        const response = await fetch('http://localhost:5200/api/v1/users/user');
        const data = await response.json();
        fetchUsername(data.username);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:5200/api/v1/users/user`);
        expect(mockSetSignedIn).not.toHaveBeenCalled();
    });

    test('should render signInError on page when signInError is truthy', () => {
        render(
            <UserContext.Provider value={{ 
                setSignedIn: mockSetSignedIn, setCanceled: mockSetCanceled, 
                userInfo, setUserInfo: mockSetUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                    signInError={true}
                />
            </UserContext.Provider>
        );

        const signInErrorElement = screen.getByTestId('signInError');

        expect(signInErrorElement).toBeInTheDocument();
    });

    test('should not render signInError when signInError is falsy', () => {
        render(
            <UserContext.Provider value={{ 
                setSignedIn: mockSetSignedIn, setCanceled: mockSetCanceled, 
                userInfo, setUserInfo: mockSetUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                    signInError={false}
                />
            </UserContext.Provider>
        );

        const signInErrorElement = screen.queryByTestId('signInError');

        expect(signInErrorElement).toBe(null);
    });
    
});
