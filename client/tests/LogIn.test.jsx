import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import LogIn from '../src/components/LogIn';
import { fetchUsername } from '../src/utils';

vi.mock('../src/utils', ()=> {
    return {
        fetchUsername: vi.fn().mockImplementation((username) => {
            if (username === 'user') {
                mockSignedInFunc();
            } else {
                mockSetSignInError('username does not exist');
            }
        })
    }
});

const mockCanceledFunc = vi.fn();
const mockSetUserInfo = vi.fn();
const mockSignedInFunc = vi.fn();
const mockSetSignInError = vi.fn();
const mockSetExistingAccount = vi.fn();
let userInfo = {
    username: 'user', 
    password: 'pass', 
    items: [],  
    total: 0,
}

describe('LogIn', () => {
    test('should render on page', () => {
        render(<LogIn userInfo={userInfo}/>);

        const divElement = screen.getByTestId('logInDiv');
        expect(divElement).toBeInTheDocument();
    });

    test('should call canceledFunc on button click', () => {
        render(
            <LogIn 
                userInfo={userInfo} 
                canceledFunc={mockCanceledFunc} 
            />
        );

        const buttonElement = screen.getByText(/x/i);
        fireEvent.click(buttonElement);

        expect(mockCanceledFunc).toHaveBeenCalledOnce();
    });

    test("should call setExistingAccount on 'click here' click event", () => {
        render(
            <LogIn 
                userInfo={userInfo} 
                setUserInfo={mockSetUserInfo}
                setExistingAccount={mockSetExistingAccount}
            />
        );

        const spanElement = screen.getByText(/click here/i);
        fireEvent.click(spanElement);

        expect(mockSetExistingAccount).toHaveBeenCalledOnce();
    })

    test('should update username on change event', () => {
        render(
            <LogIn 
                userInfo={userInfo} 
                setUserInfo={mockSetUserInfo}
            />
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
            <LogIn 
                userInfo={userInfo} 
                setUserInfo={mockSetUserInfo}
            />
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
            <LogIn 
                userInfo={userInfo} 
                setUserInfo={mockSetUserInfo}
                signedInFunc={mockSignedInFunc}
                setSignInError={mockSetSignInError}
            />
        );

        const buttonElement = screen.getByText(/log in/i);
        fireEvent.click(buttonElement);

        expect(fetchUsername).toHaveBeenCalledOnce();
    });
    
    test('should run signedInFunc when username and password are correct', async () => {
        global.fetch = vi.fn(() => 
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    username: 'user', password: 'pass', items: [], total: 0 
                }),
            })
        );

        render(
            <LogIn 
                userInfo={userInfo} 
                setUserInfo={mockSetUserInfo}
                signedInFunc={mockSignedInFunc}
                setSignInError={mockSetSignInError}
            />
        );

        const response = await fetch('http://localhost:5200/api/v1/users/user');
        const data = await response.json();
        fetchUsername(data.username);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:5200/api/v1/users/user`);
        expect(mockSignedInFunc).toHaveBeenCalledOnce();
    });

    test('should not run signedInFunc when username or password is incorrect', async () => {
        global.fetch = vi.fn(() => 
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    username: 'notTheRightUser', password: 'notCorrectPass', items: [], total: 0 
                }),
            })
        );

        render(
            <LogIn 
                userInfo={userInfo} 
                setUserInfo={mockSetUserInfo}
                signedInFunc={mockSignedInFunc}
                setSignInError={mockSetSignInError}
            />
        );

        const response = await fetch('http://localhost:5200/api/v1/users/user');
        const data = await response.json();
        fetchUsername(data.username);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:5200/api/v1/users/user`);
        expect(mockSignedInFunc).not.toHaveBeenCalled();
    });

    test('should render signInError on page when signInError is truthy', () => {
        render(
            <LogIn 
                userInfo={userInfo} 
                setUserInfo={mockSetUserInfo}
                signedInFunc={mockSignedInFunc}
                setSignInError={mockSetSignInError}
                signInError={true}
            />
        );

        const signInErrorElement = screen.getByTestId('signInError');

        expect(signInErrorElement).toBeInTheDocument();
    });

    test('should not render signInError when signInError is falsy', () => {
        render(
            <LogIn 
                userInfo={userInfo} 
                setUserInfo={mockSetUserInfo}
                signedInFunc={mockSignedInFunc}
                setSignInError={mockSetSignInError}
                signInError={false}
            />
        );

        const signInErrorElement = screen.queryByTestId('signInError');

        expect(signInErrorElement).toBe(null);
    });
    
});
