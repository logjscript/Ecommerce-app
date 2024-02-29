import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Bag from '../src/components/Bag';
import { userTotalPrice } from '../src/utils';
import { UserContext } from '../src/components/UserContext';

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

describe('Bag', () => {
    test('should render on page', () => {
        render(
            <UserContext.Provider value={{userInfo, setUserInfo: mockSetUserInfo}}>
                <Bag />
            </UserContext.Provider>
        );

        const headerElement = screen.getByText(/Total/i);
        const divElement = screen.getByTestId('testContainerDiv');
        expect(headerElement).toBeInTheDocument();
        expect(divElement).toBeInTheDocument();
    });
    
    test('should render total price on page when userTotalPrice is truthy', () => {
        render(
            <UserContext.Provider value={{userInfo, setUserInfo: mockSetUserInfo}}>
                <Bag />
            </UserContext.Provider>
        );

        const priceTotal = userTotalPrice(userInfo.items);

        const headerElement = screen.getByText(/Total/i);
        const headerContent = headerElement.textContent;
        expect(headerContent).toBe(`Total: $${priceTotal.toFixed(2)}`);
    });

    test("should render '$0.00' when userTotalPrice is falsy", () => {
        userInfo.items = [];
        userInfo.total = 0.00;

        render(
            <UserContext.Provider value={{userInfo, setUserInfo: mockSetUserInfo}}>
                <Bag />
            </UserContext.Provider>
        );

        const headerElement = screen.getByRole('heading');
        const headerContent = headerElement.textContent;
        expect(headerContent).toBe('Total: $0.00');
    });

    test('should render mapped items when userInfo.items is truthy', () => {
        render(
            <UserContext.Provider value={{userInfo, setUserInfo: mockSetUserInfo}}>
                <Bag />
            </UserContext.Provider>
        );
            console.log(userInfo);
        const divElements = screen.getAllByTestId('testMappedDiv');
        divElements.forEach((div) => {
            expect(div).toBeInTheDocument();
        });
    });

    test("should render 'no items' when userInfo.items is falsy", () => {
        userInfo.items = [];
        userInfo.total = 0.00;

        render(
            <UserContext.Provider value={{userInfo, setUserInfo: mockSetUserInfo}}>
                <Bag />
            </UserContext.Provider>
        );

        const divElement = screen.getByText(/No Items/i);
        expect(divElement).toBeInTheDocument();
    });
});