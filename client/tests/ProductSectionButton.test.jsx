import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import ProductSectionButton from '../src/components/ProductSectionButton';
import { UserContext } from '../src/components/UserContext';

const mockSetCanceled = vi.fn();
const mockSetUserInfo = vi.fn();

let userInfo;
let item;

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

    item = {
        link: '../../public/images/shoes-imgs/shoes2.jpg',
        value: '$57.95',
        name: 'Shoes Two', 
        quantity: 0, 
    }
});

describe('ProductSectionButton', () => {
    test('should render on page', () => {
        render(
            <UserContext.Provider value={{
                userInfo, setUserInfo: mockSetUserInfo,
                signedIn: true, setCanceled: mockSetCanceled
            }}>
                <ProductSectionButton item={item} />
            </UserContext.Provider>
        );

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    test("should change 'canceled' state to 'false' if not signed in", () => {
        render(
            <UserContext.Provider value={{
                userInfo, setUserInfo: mockSetUserInfo,
                signedIn: false, setCanceled: mockSetCanceled
            }}>
                <ProductSectionButton item={item} />
            </UserContext.Provider>
        );

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);
        expect(mockSetCanceled).toHaveBeenCalledWith(false);
    });

    test('should increment quantity of item if item exists', () => {
        render(
            <UserContext.Provider value={{
                userInfo, setUserInfo: mockSetUserInfo,
                signedIn: true, setCanceled: mockSetCanceled
            }}>
                <ProductSectionButton item={userInfo.items[0]} />
            </UserContext.Provider>
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
            <UserContext.Provider value={{
                userInfo, setUserInfo: mockSetUserInfo,
                signedIn: true, setCanceled: mockSetCanceled
            }}>
                <ProductSectionButton item={item} />
            </UserContext.Provider>
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