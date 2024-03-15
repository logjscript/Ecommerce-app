import { render, screen, fireEvent } from '@testing-library/react';
import { describe, vi } from 'vitest';
import DeleteBagItem from '../src/components/DeleteBagItem';
import { UserContext } from '../src/components/UserContext';

const mockSetSignedInUserInfo = vi.fn();
let signedInUserInfo;

beforeEach(() => {
    signedInUserInfo = {
        username: 'User', 
        password: 'pass', 
        items: [
            {
                link: '../../public/images/tshirt-imgs/shirt1.jpg', 
                value: '$42.99', 
                name: 'Tshirt One', 
                quantity: 1, 
            },
            {
                link: '../../public/images/pants-imgs/pants2.jpg', 
                value: '$69.99', 
                name: 'Pants Two', 
                quantity: 3, 
            },
        ],  
        total: 0,
    }
});

describe('DeleteBagItem', () => {
    test('should render on page', () => {
        render(
            <UserContext.Provider value={{signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo}}>
                <DeleteBagItem item={signedInUserInfo.items[0]} />
            </UserContext.Provider>
        );

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    test('should decrement item quantity in signedInUserInfo state when item.quantity > 1', () => {
        render(
            <UserContext.Provider value={{signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo}}>
                <DeleteBagItem item={signedInUserInfo.items[1]} />
            </UserContext.Provider>
        );

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement)

        expect(mockSetSignedInUserInfo).toHaveBeenCalledWith({
            ...signedInUserInfo,
            items: [
                {...signedInUserInfo.items[0]},
                {...signedInUserInfo.items[1], quantity: signedInUserInfo.items[1].quantity - 1}
            ],
        });
    });

    test('should delete item in signedInUserInfo state when item.quantity === 1', () => {
        render(
            <UserContext.Provider value={{signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo}}>
                <DeleteBagItem item={signedInUserInfo.items[0]} />
            </UserContext.Provider>
        );

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement)

        expect(mockSetSignedInUserInfo).toHaveBeenCalledWith({
            ...signedInUserInfo,
            items: [
                {...signedInUserInfo.items[1]}
            ],
        });
    });
});