import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import LogIn from '../src/components/LogIn';
import { checkUserInfo } from '../src/utils';
import { UserContext } from '../src/components/UserContext';

vi.mock('../src/utils', ()=> {
    return {
        checkUserInfo: vi.fn().mockImplementation((username) => {
            if (username === 'user') {
                mockSetUserSignedIn();
            } else {
                mockSetSignInError('username does not exist');
            }
        })
    }
});

const mockSetCancelSignIn = vi.fn();
const mockSetSignedInUserInfo = vi.fn();
const mockSetLoading = vi.fn();
const mockSetUserSignedIn = vi.fn();
const mockSetSignInError = vi.fn();
const mockSetExistingAccount = vi.fn();

let signedInUserInfo;

beforeEach(() => {
    signedInUserInfo = {
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
                setUserSignedIn: mockSetUserSignedIn, setCancelSignIn: mockSetCancelSignIn, 
                signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                    setLoading={mockSetLoading}
                />
            </UserContext.Provider>
        );

        const divElement = screen.getByTestId('logInDiv');
        expect(divElement).toBeInTheDocument();
    });

    test('should call checkUserInfo on button click event', () => {
        render(
            <UserContext.Provider value={{ 
                setUserSignedIn: mockSetUserSignedIn, setCancelSignIn: mockSetCancelSignIn, 
                signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                    setLoading={mockSetLoading}
                />
            </UserContext.Provider>
        );

        const buttonElement = screen.getByText(/log in/i);
        fireEvent.click(buttonElement);

        expect(checkUserInfo).toHaveBeenCalledOnce();
    });
    
    test('should update setUserSignedIn when username and password are correct', async () => {
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
                setUserSignedIn: mockSetUserSignedIn, setCancelSignIn: mockSetCancelSignIn, 
                signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                    setLoading={mockSetLoading}
                />
            </UserContext.Provider>
        );

        const response = await fetch('http://localhost:5200/api/v1/users/user');
        const data = await response.json();
        checkUserInfo(data.username);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:5200/api/v1/users/user`);
        expect(mockSetUserSignedIn).toHaveBeenCalledOnce();
    });

    test('should not run setUserSignedIn when username or password is incorrect', async () => {
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
                setUserSignedIn: mockSetUserSignedIn, setCancelSignIn: mockSetCancelSignIn, 
                signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                    setLoading={mockSetLoading}
                />
            </UserContext.Provider>
        );

        const response = await fetch('http://localhost:5200/api/v1/users/user');
        const data = await response.json();
        checkUserInfo(data.username);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:5200/api/v1/users/user`);
        expect(mockSetUserSignedIn).not.toHaveBeenCalled();
    });

    test('should render signInError on page when signInError is truthy', () => {
        render(
            <UserContext.Provider value={{ 
                setUserSignedIn: mockSetUserSignedIn, setCancelSignIn: mockSetCancelSignIn, 
                signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                    signInError={true}
                    setLoading={mockSetLoading}
                />
            </UserContext.Provider>
        );

        const signInErrorElement = screen.getByTestId('signInError');

        expect(signInErrorElement).toBeInTheDocument();
    });

    test('should not render signInError when signInError is falsy', () => {
        render(
            <UserContext.Provider value={{ 
                setUserSignedIn: mockSetUserSignedIn, setCancelSignIn: mockSetCancelSignIn, 
                signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo
             }}>
                <LogIn 
                    setExistingAccount={mockSetExistingAccount}
                    setSignInError={mockSetSignInError}
                    signInError={false}
                    setLoading={mockSetLoading}
                />
            </UserContext.Provider>
        );

        const signInErrorElement = screen.queryByTestId('signInError');

        expect(signInErrorElement).toBe(null);
    });
    
});
