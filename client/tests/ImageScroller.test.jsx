import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ImageScroller from '../src/components/ImageScroller';
import { ItemProvider } from '../src/components/ItemContext';
import { UserContext } from '../src/components/UserContext';

const mockSetItemType = vi.fn();


describe('ImageScroller', () => {
    test('should render on page', () => {
        render(
            <ItemProvider>
                <UserContext.Provider value={{ setItemType: mockSetItemType}}>
                    <ImageScroller />
                </UserContext.Provider>
            </ItemProvider>
        );

        const divElement = screen.getByTestId('scroller');
        expect(divElement).toBeInTheDocument();
    });
    
    test('should render images on page', () => {
        render(
            <ItemProvider>
                <UserContext.Provider value={{ setItemType: mockSetItemType}}>
                    <ImageScroller />
                </UserContext.Provider>
            </ItemProvider>
        );

        const imgElements = screen.getAllByRole('img');
        imgElements.forEach((img) => {
            expect(img).toBeInTheDocument();
        });
    });

    test('should decrease scrollLeft value by 600 on click', () => {
        render(
            <ItemProvider>
                <UserContext.Provider value={{ setItemType: mockSetItemType}}>
                    <ImageScroller />
                </UserContext.Provider>
            </ItemProvider>
        );

        const divElement = screen.getByTestId('slider');
        const leftArrow = screen.getByTestId('left');
        fireEvent.click(leftArrow);
        expect(divElement.scrollLeft).toBe(-600);
    });

    test('should increase scrollLeft value by 600 on click', () => {
        render(
            <ItemProvider>
                <UserContext.Provider value={{ setItemType: mockSetItemType}}>
                    <ImageScroller />
                </UserContext.Provider>
            </ItemProvider>
        );
        const divElement = screen.getByTestId('slider');
        const rightArrow = screen.getByTestId('right');
        fireEvent.click(rightArrow);
        expect(divElement.scrollLeft).toBe(600);
    });
    
    test("should set 'itemType' state based on index of img clicked", () => {
        render(
            <ItemProvider>
                <UserContext.Provider value={{ setItemType: mockSetItemType}}>
                    <ImageScroller />
                </UserContext.Provider>
            </ItemProvider>
        );

        const imgElements = screen.getAllByRole('img');
        const imgElement = imgElements[0];
        fireEvent.click(imgElement);
        expect(mockSetItemType).toHaveBeenCalledWith('hats');
    });
});
