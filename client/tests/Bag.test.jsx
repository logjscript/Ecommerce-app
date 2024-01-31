import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Bag from '../src/components/Bag';
import { userTotalPrice } from '../src/utils';

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

const priceTotal = userTotalPrice(userInfo.items);

describe('Bag', () => {
    test('should render on page', () => {
        render(<Bag userInfo={userInfo} />);

        const headerElement = screen.getByRole('heading');
        const divElement = screen.getByTestId('testContainerDiv');
        expect(headerElement).toBeInTheDocument();
        expect(divElement).toBeInTheDocument();
    });
    
    test('should render total price on page when userTotalPrice is truthy', () => {
        render(<Bag userInfo={userInfo} />);

        const headerElement = screen.getByRole('heading');
        const headerContent = headerElement.textContent;
        expect(headerContent).toBe(`Total: $${priceTotal.toFixed(2)}`);
    });

    test("should render '$0.00' when userTotalPrice is falsy", () => {
        render(<Bag userInfo={{...userInfo, items: []}} />);

        const headerElement = screen.getByRole('heading');
        const headerContent = headerElement.textContent;
        expect(headerContent).toBe('Total: $0.00');
    });

    test('should render mapped items when userInfo.items is truthy', () => {
        render(<Bag userInfo={userInfo} />);

        const divElements = screen.getAllByTestId('testMappedDiv');
        divElements.forEach((div) => {
            expect(div).toBeInTheDocument();
        });
    });

    test("should render 'no items' when userInfo.items is falsy", () => {
        render(<Bag userInfo={{...userInfo, items: []}} />);

        const divElement = screen.getByText(/No Items/i);
        expect(divElement).toBeInTheDocument();
    });
});