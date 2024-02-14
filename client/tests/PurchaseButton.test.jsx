import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import PurchaseButton from '../src/components/PurchaseButton';
import { UserContext } from '../src/components/UserContext';

const mockSetBought = vi.fn();
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

describe('PurchaseButton', () => {
    test('should render', () => {
        render(
            <UserContext.Provider value={{ userInfo, setUserInfo: mockSetUserInfo }}>
                <PurchaseButton setBought={mockSetBought} />
            </UserContext.Provider>
        );

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    test('should change bought value on click event', () => {
        render(
            <UserContext.Provider value={{ userInfo, setUserInfo: mockSetUserInfo }}>
                <PurchaseButton setBought={mockSetBought} />
            </UserContext.Provider>
        );
        
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(mockSetBought).toHaveBeenCalledWith(true);
    });

    test('should change userInfo value on click event', () => {
        render(
            <UserContext.Provider value={{ userInfo, setUserInfo: mockSetUserInfo }}>
                <PurchaseButton setBought={mockSetBought} />
            </UserContext.Provider>
        );
        
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(mockSetUserInfo).toHaveBeenCalled();
    });
})