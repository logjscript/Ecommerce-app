import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Dashboard from '../src/components/Dashboard';
import { itemsInBag } from '../src/utils';

const mockSetType = vi.fn();
const mockSetCanceled = vi.fn();
const mockSetSignedIn = vi.fn();
const mockSetUserInfo = vi.fn();

const userInfo = {
    username: 'User', 
    password: 'pass', 
    items: [
        {
            link: '../../public/images/tshirt-imgs/shirt1.jpg', 
            value: '$42.99', 
            name: 'Tshirt One', 
            quantity: 2, 
        },
        {
            link: '../../public/images/pants-imgs/pants2.jpg', 
            value: '$69.99', 
            name: 'Pants Two', 
            quantity: 1, 
        },
    ],  
    total: 0,
};

const totalItems = itemsInBag(userInfo?.items);

describe('Dashboard', () => {
    test('should render on page', () => {
        render(
            <Dashboard userInfo={userInfo}/>
        );

        const divElement = screen.getByTestId('container');
        expect(divElement).toBeInTheDocument();
    });

    test("should set 'type' state when clicking an item header", () => {
        render(<Dashboard setType={mockSetType} />);

        const buttonElement = screen.getByTestId('itemTypeButton');
        fireEvent.click(buttonElement);
        
        expect(mockSetType).toHaveBeenCalledWith('hats')
    });

    test('should show username and sign out button when signed in', () => {
        render(<Dashboard signedIn={true} userInfo={userInfo} />);

        const divElement = screen.getByText(/Hello/i);
        const buttonElement = screen.getByText(/Sign Out/i)

        expect(divElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });

    test('should show number of items in Bag when signed in and items > 0', () => {
        render(<Dashboard signedIn={true} userInfo={userInfo} />);

        const divElement = screen.getByTestId('itemQuantity');
        const divContent = Number(divElement.textContent);

        expect(divElement).toBeInTheDocument();
        expect(divContent).toBe(totalItems);
    });

    test('should not show number of items in Bag when there are no items in Bag', () => {
        render(<Dashboard signedIn={true} userInfo={{...userInfo, items: []}} />);

        const divElement = screen.queryByTestId('itemQuantity');

        expect(divElement).not.toBeInTheDocument();
    });

    test('should show sign in button when signed out', () => {
        render(<Dashboard signedIn={false} userInfo={userInfo} />);

        const buttonElement = screen.getByText(/Sign In/i)

        expect(buttonElement).toBeInTheDocument();
    });

    test("should set appropriate state when clicking 'sign out'", () => {
        render(
            <Dashboard 
                setSignedIn={mockSetSignedIn}
                setCanceled={mockSetCanceled}
                setType={mockSetType}
                setUserInfo={mockSetUserInfo}
                userInfo={userInfo}
                signedIn={true}
            />
        );

        const buttonElement = screen.getByText(/Sign out/i);
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