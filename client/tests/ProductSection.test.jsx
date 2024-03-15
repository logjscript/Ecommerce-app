import { render, screen } from '@testing-library/react';
import { describe, expect, test} from 'vitest';
import ProductSection from '../src/components/ProductSection';
import { ImageProvider } from '../src/components/ImageContext';
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
            <ImageProvider>
                <UserContext.Provider value={{ itemType: 'hats'}}>
                    <ProductSection />
                </UserContext.Provider>
            </ImageProvider>
        );

        const divElement = screen.getByTestId('testDiv');
        expect(divElement).toBeInTheDocument();
    });
    
    test('should render hat images on page', () => {
        render(
            <ImageProvider>
                <UserContext.Provider value={{ itemType: 'hats'}}>
                    <ProductSection />
                </UserContext.Provider>
            </ImageProvider>
        );

        const imageElements = screen.getAllByRole('img');
        imageElements.forEach((img) => {
            expect(img).toBeInTheDocument();
        })
    });
});