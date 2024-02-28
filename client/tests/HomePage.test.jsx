import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import HomePage from '../src/components/HomePage';
import { ImageProvider } from '../src/components/ImageContext';
import { UserContext } from '../src/components/UserContext';

const mockSetType = vi.fn();

describe('Homepage', () => {
    test('should render on page', () => {
        render(
            <ImageProvider>
                <UserContext.Provider value={{ setType: mockSetType }}>
                    <HomePage />
                </UserContext.Provider>
            </ImageProvider>
        );

        const divElement = screen.getByTestId('homepage');
        expect(divElement).toBeInTheDocument();
    });
});