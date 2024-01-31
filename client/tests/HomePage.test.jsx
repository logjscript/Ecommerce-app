import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import HomePage from '../src/components/HomePage';
import { ImageProvider } from '../src/components/ImageContext';

const mockSetType = vi.fn();

describe('Homepage', () => {
    test('should render on page', () => {
        render(
            <ImageProvider>
                <HomePage />
            </ImageProvider>
        );

        const divElement = screen.getByTestId('homepage');
        expect(divElement).toBeInTheDocument();
    });

    test('should set type state to hats on click', () => {
        render(
            <ImageProvider>
                <HomePage setType={mockSetType}/>
            </ImageProvider>
        );

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(mockSetType).toHaveBeenCalledWith('hats');
    });
});