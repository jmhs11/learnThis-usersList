import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
	const buttonText = 'Button from test';

	it('should render button correctly', () => {
		// Arrange
		const component = render(<Button text={buttonText} />);
		// Act
		// Assert
		component.getByText(buttonText);
	});

	it('clicking the button calls event handler once', () => {
		// Arrange
		const mockHandler = vi.fn();
		const component = render(
			<Button text={buttonText} handleClick={mockHandler} />
		);
		const button = component.getByText(buttonText);
		// Act
		fireEvent.click(button);
		// Assert
		expect(mockHandler).toHaveBeenCalledTimes(1);
	});
});
