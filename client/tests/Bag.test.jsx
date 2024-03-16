import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Bag from '../src/components/Bag';
import { totalBagPrice } from '../src/utils';
import { UserContext } from '../src/components/UserContext';

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

describe('Bag', () => {
    test('should render on page', () => {
        render(
            <UserContext.Provider value={{signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo}}>
                <Bag />
            </UserContext.Provider>
        );

        const headerElement = screen.getByText(/Total/i);
        const divElement = screen.getByTestId('testContainerDiv');
        expect(headerElement).toBeInTheDocument();
        expect(divElement).toBeInTheDocument();
    });
    
    test('should render total price on page when totalBagPrice is truthy', () => {
        render(
            <UserContext.Provider value={{signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo}}>
                <Bag />
            </UserContext.Provider>
        );

        const priceTotal = totalBagPrice(signedInUserInfo.items);

        const headerElement = screen.getByText(/Total/i);
        const headerContent = headerElement.textContent;
        expect(headerContent).toBe(`Total: $${priceTotal.toFixed(2)}`);
    });

    test("should render '$0.00' when totalBagPrice is falsy", () => {
        signedInUserInfo.items = [];
        signedInUserInfo.total = 0.00;

        render(
            <UserContext.Provider value={{signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo}}>
                <Bag />
            </UserContext.Provider>
        );

        const headerElement = screen.getByRole('heading');
        const headerContent = headerElement.textContent;
        expect(headerContent).toBe('Total: $0.00');
    });

    test('should render mapped items when signedInUserInfo.items is truthy', () => {
        render(
            <UserContext.Provider value={{signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo}}>
                <Bag />
            </UserContext.Provider>
        );
            console.log(signedInUserInfo);
        const divElements = screen.getAllByTestId('testMappedDiv');
        divElements.forEach((div) => {
            expect(div).toBeInTheDocument();
        });
    });

    test("should render 'no items' when signedInUserInfo.items is falsy", () => {
        signedInUserInfo.items = [];
        signedInUserInfo.total = 0.00;

        render(
            <UserContext.Provider value={{signedInUserInfo, setSignedInUserInfo: mockSetSignedInUserInfo}}>
                <Bag />
            </UserContext.Provider>
        );

        const divElement = screen.getByText(/No Items/i);
        expect(divElement).toBeInTheDocument();
    });
});