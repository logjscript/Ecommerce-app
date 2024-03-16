import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import HomePage from '../src/components/HomePage';
import { ItemProvider } from '../src/components/ImageContext';
import { UserContext } from '../src/components/UserContext';

const mockSetItemType = vi.fn();

describe('Homepage', () => {
    test('should render on page', () => {
        render(
            <ItemProvider>
                <UserContext.Provider value={{ setItemType: mockSetItemType }}>
                    <HomePage />
                </UserContext.Provider>
            </ItemProvider>
        );

        const divElement = screen.getByTestId('homepage');
        expect(divElement).toBeInTheDocument();
    });
});