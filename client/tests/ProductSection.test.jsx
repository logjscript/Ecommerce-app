import { getByTestId, render, screen } from '@testing-library/react';
import { describe, expect, test} from 'vitest';
import ProductSection from '../src/components/ProductSection';
import { ImageProvider } from '../src/components/ImageContext';

describe('ProductSection', () => {
    test('should render on page', () => {
        render(
            <ImageProvider>
                <ProductSection clothingType={'hats'} />
            </ImageProvider>
        );

        const divElement = screen.getByTestId('testDiv');
        expect(divElement).toBeInTheDocument();
    });
    
    test('should render images on page', () => {
        render(
            <ImageProvider>
                <ProductSection clothingType={'hats'} />
            </ImageProvider>
        );

        const imageElements = screen.getAllByRole('img');
        imageElements.forEach((img) => {
            expect(img).toBeInTheDocument();
        })
    });
});