import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ImageScroller from '../src/components/ImageScroller';
import { ImageProvider } from '../src/components/ImageContext';
import { UserContext } from '../src/components/UserContext';

const mockSetType = vi.fn();


describe('ImageScroller', () => {
    test('should render on page', () => {
        render(
            <ImageProvider>
                <UserContext.Provider value={{ setType: mockSetType}}>
                    <ImageScroller />
                </UserContext.Provider>
            </ImageProvider>
        );

        const divElement = screen.getByTestId('scroller');
        expect(divElement).toBeInTheDocument();
    });
    
    test('should render images on page', () => {
        render(
            <ImageProvider>
                <UserContext.Provider value={{ setType: mockSetType}}>
                    <ImageScroller />
                </UserContext.Provider>
            </ImageProvider>
        );

        const imgElements = screen.getAllByRole('img');
        imgElements.forEach((img) => {
            expect(img).toBeInTheDocument();
        });
    });

    test('should decrease scrollLeft value by 500 on click', () => {
        render(
            <ImageProvider>
                <UserContext.Provider value={{ setType: mockSetType}}>
                    <ImageScroller />
                </UserContext.Provider>
            </ImageProvider>
        );

        const divElement = screen.getByTestId('slider');
        const leftArrow = screen.getByTestId('left');
        fireEvent.click(leftArrow);
        expect(divElement.scrollLeft).toBe(-500);
    });

    test('should increase scrollLeft value by 500 on click', () => {
        render(
            <ImageProvider>
                <UserContext.Provider value={{ setType: mockSetType}}>
                    <ImageScroller />
                </UserContext.Provider>
            </ImageProvider>
        );
        const divElement = screen.getByTestId('slider');
        const rightArrow = screen.getByTestId('right');
        fireEvent.click(rightArrow);
        expect(divElement.scrollLeft).toBe(500);
    });
    
    test("should set 'type' state based on index of img clicked", () => {
        render(
            <ImageProvider>
                <UserContext.Provider value={{ setType: mockSetType}}>
                    <ImageScroller />
                </UserContext.Provider>
            </ImageProvider>
        );

        const imgElements = screen.getAllByRole('img');
        const imgElement = imgElements[0];
        fireEvent.click(imgElement);
        expect(mockSetType).toHaveBeenCalledWith('hats');
    });
});
