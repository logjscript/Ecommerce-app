import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import PurchaseButton from '../src/components/PurchaseButton';
import { UserContext } from '../src/components/UserContext';

const mockSetItemsArePurchased = vi.fn();
const mockSetSignedInUserInfo = vi.fn();
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

describe('PurchaseButton', () => {
    test('should render', () => {
        render(
            <UserContext.Provider value={{ signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo }}>
                <PurchaseButton setItemsArePurchased={mockSetItemsArePurchased} />
            </UserContext.Provider>
        );

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    test('should change itemsArePurchased value on click event', () => {
        render(
            <UserContext.Provider value={{ signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo }}>
                <PurchaseButton setItemsArePurchased={mockSetItemsArePurchased} />
            </UserContext.Provider>
        );
        
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(mockSetItemsArePurchased).toHaveBeenCalledWith(true);
    });

    test('should change signedInUserInfo value on click event', () => {
        render(
            <UserContext.Provider value={{ signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo }}>
                <PurchaseButton setItemsArePurchased={mockSetItemsArePurchased} />
            </UserContext.Provider>
        );
        
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(mockSetSignedInUserInfo).toHaveBeenCalled();
    });
})