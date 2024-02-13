import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import PurchaseButton from '../src/components/PurchaseButton';
import { userInfo } from './testUserInfo';

const mockSetBought = vi.fn();
const mockSetUserInfo = vi.fn();

describe('PurchaseButton', () => {
    test('should render', () => {
        render(<PurchaseButton />);

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    test('should change bought value on click event', () => {
        render(
            <PurchaseButton 
                setBought={mockSetBought}
                userInfo={userInfo}
                setUserInfo={mockSetUserInfo}
            />
        );
        
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(mockSetBought).toHaveBeenCalledWith(true);
    });

    test('should change userInfo value on click event', () => {
        render(
            <PurchaseButton 
                setBought={mockSetBought}
                userInfo={userInfo}
                setUserInfo={mockSetUserInfo}
            />
        );
        
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(mockSetUserInfo).toHaveBeenCalled();
    });
})