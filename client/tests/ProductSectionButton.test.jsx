import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import ProductSectionButton from '../src/components/ProductSectionButton';

const mockSetCanceled = vi.fn();
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
}

const item = {
    link: '../../public/images/shoes-imgs/shoes2.jpg',
    value: '$57.95',
    name: 'Shoes Two', 
    quantity: 0, 
}


describe('ProductSectionButton', () => {
    test('should render on page', () => {
        render(<ProductSectionButton />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    test('should change canceled state to false if not signed in', () => {
        render(
            <ProductSectionButton 
                signedIn={false}
                setCanceled={mockSetCanceled}
            />
        );

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);
        expect(mockSetCanceled).toHaveBeenCalledWith(false);
    });

    test('should increment quantity of item if item exists', () => {
        render(
            <ProductSectionButton
                userInfo={userInfo}
                setUserInfo={mockSetUserInfo}
                item={userInfo.items[0]} 
                signedIn={true}
                setCanceled={mockSetCanceled}
            />
        );

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(mockSetUserInfo).toHaveBeenCalledWith({
            ...userInfo,
            items: [
                {...userInfo.items[0], quantity: userInfo.items[0].quantity + 1},
                {...userInfo.items[1]}
            ]
        });
    });

    test('should add item to userInfo.items array if item does not exist', () => {
        render(
            <ProductSectionButton
                userInfo={userInfo}
                setUserInfo={mockSetUserInfo}
                item={item} 
                signedIn={true}
                setCanceled={mockSetCanceled}
            />
        );

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(mockSetUserInfo).toHaveBeenCalledWith({
            ...userInfo,
            items: [
                ...userInfo.items,
                {...item, quantity: 1}
            ]
        });
    });
});