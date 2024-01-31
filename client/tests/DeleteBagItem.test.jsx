import { render, screen, fireEvent } from '@testing-library/react';
import { describe, vi } from 'vitest';
import DeleteBagItem from '../src/components/DeleteBagItem';

const mockSetUserInfo = vi.fn();

describe('DeleteBagItem', () => {
    test('should render on page', () => {
        render(
            <DeleteBagItem />
        );

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    test('should decrement item quantity in userInfo state when item.quantity > 1', () => {
        const userInfo = {
            username: 'User', 
            password: 'pass', 
            items: [
                {
                    link: '../../public/images/tshirt-imgs/shirt1.jpg', 
                    value: '$42.99', 
                    name: 'Tshirt One', 
                    quantity: 2, 
                    id: 0
                },
                {
                    link: '../../public/images/pants-imgs/pants2.jpg', 
                    value: '$69.99', 
                    name: 'Pants Two', 
                    quantity: 2, 
                    id: 1
                },
            ],  
            total: 0,
        }

        render(
            <DeleteBagItem 
                item={userInfo.items[0]} 
                userInfo={userInfo} 
                setUserInfo={mockSetUserInfo}
            />
        );

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement)

        expect(mockSetUserInfo).toHaveBeenCalledWith({
            ...userInfo,
            items: [
                {...userInfo.items[0], quantity: 1},
                {...userInfo.items[1]}
            ],
        });
    });

    test('should delete item in userInfo state when item.quantity === 1', () => {
        const userInfo = {
            username: 'User', 
            password: 'pass', 
            items: [
                {
                    link: '../../public/images/tshirt-imgs/shirt1.jpg', 
                    value: '$42.99', 
                    name: 'Tshirt One', 
                    quantity: 1, 
                    id: 0
                },
                {
                    link: '../../public/images/pants-imgs/pants2.jpg', 
                    value: '$69.99', 
                    name: 'Pants Two', 
                    quantity: 2, 
                    id: 1
                },
            ],  
            total: 0,
        }

        render(
            <DeleteBagItem 
                item={userInfo.items[0]} 
                userInfo={userInfo} 
                setUserInfo={mockSetUserInfo}
            />
        );

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement)

        expect(mockSetUserInfo).toHaveBeenCalledWith({
            ...userInfo,
            items: [
                {...userInfo.items[1]}
            ],
        });
    });
});