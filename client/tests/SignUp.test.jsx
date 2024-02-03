import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import SignUp from '../src/components/SignUp';
import { changeBorderColor } from '../src/utils';

vi.mock('../src/utils', () => {
    return {
        changeBorderColor: vi.fn()
    }
})

const mockSetNewUserInfo = vi.fn();
const mockSetExistingAccount = vi.fn();
const mockSetSignInError = vi.fn();

let newUserInfo = {
    username: '', 
    password: '', 
    verifyPassword: '',
    passwordMatch: true
}


describe('SignUp', () => {
    test('should render on page', () => {
        render(
            <SignUp 
                newUserInfo={newUserInfo}
                setNewUserInfo={mockSetNewUserInfo}
                setExistingAccount={mockSetExistingAccount}
                setSignInError={mockSetSignInError}
            />
        );

        const divElement = screen.getByTestId('signUpDiv');
        expect(divElement).toBeInTheDocument();
    });

    test('should update newUserInfo.username on change event', async () => {
        render(
            <SignUp 
                newUserInfo={newUserInfo}
                setNewUserInfo={mockSetNewUserInfo}
                setExistingAccount={mockSetExistingAccount}
                setSignInError={mockSetSignInError}
            />
        );

        const inputElement = screen.getByPlaceholderText(/username/i);
        fireEvent.change(inputElement, { target: {value: 'user'}});

        expect(mockSetNewUserInfo).toHaveBeenCalledWith({
            ...newUserInfo, 
            username: 'user',
        });     
    });
    test("should update 'password' and 'passwordMatch' on change event", () => {
        render(
            <SignUp 
                newUserInfo={newUserInfo}
                setNewUserInfo={mockSetNewUserInfo}
                setExistingAccount={mockSetExistingAccount}
                setSignInError={mockSetSignInError}
            />
        );

        const inputElement = screen.getByPlaceholderText(/create your password/i);
        fireEvent.change(inputElement, { target: {value: 'pass'}});

        expect(mockSetNewUserInfo).toHaveBeenCalledWith({
            ...newUserInfo, 
            password: 'pass',
        });     
    });
    test("should update 'verifyPassword' on change event", () => {
        render(
            <SignUp 
                newUserInfo={{
                    ...newUserInfo,
                    password: 'pass'
                }}
                setNewUserInfo={mockSetNewUserInfo}
                setExistingAccount={mockSetExistingAccount}
                setSignInError={mockSetSignInError}
            />
        );

        const inputElement = screen.getByPlaceholderText(/verify your password/i);
        fireEvent.change(inputElement, { target: {value: 'pass'}});

        expect(mockSetNewUserInfo).toHaveBeenCalledWith({
            ...newUserInfo,
            password: 'pass', 
            verifyPassword: 'pass'
        });     
    });

    test("should update 'passwordMatch' on change event", () => {
        render(
            <SignUp 
                newUserInfo={{
                    ...newUserInfo,
                    password: 'pass'
                }}
                setNewUserInfo={mockSetNewUserInfo}
                setExistingAccount={mockSetExistingAccount}
                setSignInError={mockSetSignInError}
            />
        );

        const inputElement = screen.getByPlaceholderText(/verify your password/i);
        fireEvent.change(inputElement, { target: {value: 'notMatchingPass'}});

        expect(mockSetNewUserInfo).toHaveBeenCalledWith({
            ...newUserInfo,
            password: 'pass', 
            verifyPassword: 'notMatchingPass',
            passwordMatch: false
        });     
    });
});