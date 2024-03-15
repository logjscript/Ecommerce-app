import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Dashboard from '../src/components/Dashboard';
import { itemsInBag } from '../src/utils';
import { UserContext } from '../src/components/UserContext';

const mockSetType = vi.fn();
const mockSetCanceled = vi.fn();
const mockSetSignedIn = vi.fn();
const mockSetUserInfo = vi.fn();

let userInfo;

beforeEach(() => {
    userInfo = {
        username: 'user',
        password: 'password',
        items: [
            { name: 'Item 1', value: 10.00, quantity: 1, link: 'link1' },
            { name: 'Item 2', value: 15.00, quantity: 2, link: 'link2' }
        ],
        total: 40.00
    };
});

describe('Dashboard', () => {
    test('should render on page', () => {
        render(
            <UserContext.Provider value={{ 
                signedIn: true, setSignedIn: mockSetSignedIn, 
                userInfo, setUserInfo: mockSetUserInfo,
                setType: mockSetType, setCanceled: mockSetCanceled
             }}>
                <Dashboard />
            </UserContext.Provider>
        );

        const divElement = screen.getByTestId('container');
        expect(divElement).toBeInTheDocument();
    });

    test("should set 'type' state when clicking an item header", () => {
        render(
            <UserContext.Provider value={{ 
                signedIn: true, setSignedIn: mockSetSignedIn, 
                userInfo, setUserInfo: mockSetUserInfo,
                setType: mockSetType, setCanceled: mockSetCanceled
                }}>
                <Dashboard />
            </UserContext.Provider>
        );

        const buttonElement = screen.getByTestId('itemTypeButton1');
        fireEvent.click(buttonElement);
        
        expect(mockSetType).toHaveBeenCalledWith('hats')
    });

    test('should show number of items in Bag when signed in and items > 0', () => {
        render(
            <UserContext.Provider value={{ 
                signedIn: true, setSignedIn: mockSetSignedIn, 
                userInfo, setUserInfo: mockSetUserInfo,
                setType: mockSetType, setCanceled: mockSetCanceled
             }}>
                <Dashboard />
            </UserContext.Provider>
        );

        const totalItems = itemsInBag(userInfo?.items);

        const divElement = screen.getByTestId('dashIconItemCount');
        const divContent = Number(divElement.textContent);

        expect(divElement).toBeInTheDocument();
        expect(divContent).toBe(totalItems);
    });

    test('should not show number of items in Bag when there are no items in Bag', () => {
        userInfo.items = [];

        render(
            <UserContext.Provider value={{ 
                signedIn: true, setSignedIn: mockSetSignedIn, 
                userInfo, setUserInfo: mockSetUserInfo,
                setType: mockSetType, setCanceled: mockSetCanceled
             }}>
                <Dashboard />
            </UserContext.Provider>
        );

        const divElement = screen.queryByTestId('itemQuantity');

        expect(divElement).not.toBeInTheDocument();
    });

    test('should show sign in button when signed out', () => {
        render(
            <UserContext.Provider value={{ 
                signedIn: false, setSignedIn: mockSetSignedIn, 
                userInfo, setUserInfo: mockSetUserInfo,
                setType: mockSetType, setCanceled: mockSetCanceled
                }}>
                <Dashboard />
            </UserContext.Provider>
        );

        const buttonElements = screen.getAllByText(/Sign In/i)

        expect(buttonElements.length).toBeGreaterThan(0);
    });

    test("should set appropriate state when clicking 'sign out'", () => {
        render(
            <UserContext.Provider value={{ 
                signedIn: true, setSignedIn: mockSetSignedIn, 
                userInfo, setUserInfo: mockSetUserInfo,
                setType: mockSetType, setCanceled: mockSetCanceled
                }}>
                <Dashboard />
            </UserContext.Provider>
        );

        const buttonElement = screen.getByTestId('signOutButton1');
        fireEvent.click(buttonElement);

        expect(mockSetSignedIn).toHaveBeenCalledWith(false);
        expect(mockSetCanceled).toHaveBeenCalledWith(true);
        expect(mockSetType).toHaveBeenCalledWith(null);
        expect(mockSetUserInfo).toHaveBeenCalledWith({
            username: '',
            password: '',
            items: [],
            total: 0,
        }); 
    });
});