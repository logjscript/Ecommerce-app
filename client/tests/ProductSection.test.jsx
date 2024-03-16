import { render, screen } from '@testing-library/react';
import { describe, expect, test} from 'vitest';
import ProductSection from '../src/components/ProductSection';
import { ItemProvider } from '../src/components/ItemContext';
import { UserContext } from '../src/components/UserContext';

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

describe('ProductSection', () => {
    test('should render on page', () => {
        render(
            <ItemProvider>
                <UserContext.Provider value={{ itemType: 'hats'}}>
                    <ProductSection />
                </UserContext.Provider>
            </ItemProvider>
        );

        const divElement = screen.getByTestId('testDiv');
        expect(divElement).toBeInTheDocument();
    });
    
    test('should render hat images on page', () => {
        render(
            <ItemProvider>
                <UserContext.Provider value={{ itemType: 'hats'}}>
                    <ProductSection />
                </UserContext.Provider>
            </ItemProvider>
        );

        const imageElements = screen.getAllByRole('img');
        imageElements.forEach((img) => {
            expect(img).toBeInTheDocument();
        })
    });
});