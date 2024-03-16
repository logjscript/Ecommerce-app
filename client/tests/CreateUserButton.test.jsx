import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import CreateUserButton from '../src/components/CreateUserButton';

vi.mock('../src/utils', () => {
    return {
        addUsername: vi.fn().mockImplementation((newUserInfo) => {
            if (newUserInfo.username !== 'existingUser') {
                if (newUserInfo.password === 'pass') {
                    return 'User created';
                } else {
                    throw new Error('Password is incorrect');
                }
            } else {
                throw new Error ('User already exists');
            }
        })
    }
});

const mockSetNewUserInfo = vi.fn();
const mockSetInputColor = vi.fn();
const mockSetExistingAccount = vi.fn();
const mockSetSignInError = vi.fn();
const mockSetLoading = vi.fn();

describe('CreateUserButton', () => {
    test('should render on page', () => {
        render(
            <CreateUserButton />
        );

        const buttonElement = screen.getByRole('button');
        
        expect(buttonElement).toBeInTheDocument();
    });

    test('should throw error if not all fields are filled in', () => {
        render(
            <CreateUserButton 
                newUserInfo={{  
                    username: '', 
                    password: '', 
                    verifyPassword: '',
                    passwordMatch: true
                }}
                setNewUserInfo={mockSetNewUserInfo}
                setInputColor={mockSetInputColor}
                setExistingAccount={mockSetExistingAccount}
                setSignInError={mockSetSignInError}
                setLoading={mockSetLoading}
            />
        );

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(mockSetSignInError).toHaveBeenCalledWith('Please fill in all required fields');
    });

    test('should throw error if username already exists', () => {
        render(
            <CreateUserButton 
                newUserInfo={{  
                    username: 'existingUser', 
                    password: 'pass', 
                    verifyPassword: 'pass',
                    passwordMatch: true
                }}
                setNewUserInfo={mockSetNewUserInfo}
                setInputColor={mockSetInputColor}
                setExistingAccount={mockSetExistingAccount}
                setSignInError={mockSetSignInError}
                borderColors={['green', 'gray', 'red']}
                setLoading={mockSetLoading}
            />
        );

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(mockSetSignInError).toHaveBeenCalledWith('User already exists');
    });

    test('should throw error if username already exists', () => {
        render(
            <CreateUserButton 
                newUserInfo={{  
                    username: 'User', 
                    password: 'notCorrectPass', 
                    verifyPassword: 'notCorrectPass',
                    passwordMatch: true
                }}
                setNewUserInfo={mockSetNewUserInfo}
                setInputColor={mockSetInputColor}
                setExistingAccount={mockSetExistingAccount}
                setSignInError={mockSetSignInError}
                borderColors={['green', 'gray', 'red']}
                setLoading={mockSetLoading}
            />
        );

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(mockSetSignInError).toHaveBeenCalledWith('Password is incorrect');
    });

    test("should not throw error when all fields are filled in and passwords match", async () => {
        render(
            <CreateUserButton 
                newUserInfo={{
                    username: 'newUser', 
                    password: 'pass', 
                    verifyPassword: 'pass',
                    passwordMatch: true
                }}
                setNewUserInfo={mockSetNewUserInfo}
                setInputColor={mockSetInputColor}
                setExistingAccount={mockSetExistingAccount}
                setSignInError={mockSetSignInError}
                setLoading={mockSetLoading}
                borderColors={['green', 'gray', 'red']}
            />
        );

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        await waitFor(() => {
            expect(mockSetExistingAccount).toHaveBeenCalledWith(true);
        });
    });
});