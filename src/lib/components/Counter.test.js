import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Counter from './Counter.svelte';

describe('Counter Component', () => {
	it('renders with initial count of 0', () => {
		render(Counter);
		
		const countDisplay = screen.getByTestId('count');
		expect(countDisplay).toHaveTextContent('0');
	});

	it('shows neutral status when count is 0', () => {
		render(Counter);
		
		const status = screen.getByText('Start counting!');
		expect(status).toBeInTheDocument();
		expect(status).toHaveClass('neutral');
	});

	it('increments count when increment button is clicked', async () => {
		render(Counter);
		
		const incrementBtn = screen.getByTestId('increment-btn');
		const countDisplay = screen.getByTestId('count');
		
		await fireEvent.click(incrementBtn);
		
		expect(countDisplay).toHaveTextContent('1');
	});

	it('decrements count when decrement button is clicked', async () => {
		render(Counter);
		
		const incrementBtn = screen.getByTestId('increment-btn');
		const decrementBtn = screen.getByTestId('decrement-btn');
		const countDisplay = screen.getByTestId('count');
		
		// First increment to 1
		await fireEvent.click(incrementBtn);
		expect(countDisplay).toHaveTextContent('1');
		
		// Then decrement back to 0
		await fireEvent.click(decrementBtn);
		expect(countDisplay).toHaveTextContent('0');
	});

	it('resets count to 0 when reset button is clicked', async () => {
		render(Counter);
		
		const incrementBtn = screen.getByTestId('increment-btn');
		const resetBtn = screen.getByTestId('reset-btn');
		const countDisplay = screen.getByTestId('count');
		
		// Increment multiple times
		await fireEvent.click(incrementBtn);
		await fireEvent.click(incrementBtn);
		await fireEvent.click(incrementBtn);
		expect(countDisplay).toHaveTextContent('3');
		
		// Reset
		await fireEvent.click(resetBtn);
		expect(countDisplay).toHaveTextContent('0');
	});

	it('allows count to go negative', async () => {
		render(Counter);
		
		const decrementBtn = screen.getByTestId('decrement-btn');
		const countDisplay = screen.getByTestId('count');
		
		// Decrement from 0
		await fireEvent.click(decrementBtn);
		expect(countDisplay).toHaveTextContent('-1');
	});

	it('shows negative status when count becomes negative', async () => {
		render(Counter);
		
		const decrementBtn = screen.getByTestId('decrement-btn');
		
		await fireEvent.click(decrementBtn);
		
		const status = screen.getByText(/Count is negative: -1/);
		expect(status).toBeInTheDocument();
		expect(status).toHaveClass('negative');
	});

	it('shows positive status when count is positive', async () => {
		render(Counter);
		
		const incrementBtn = screen.getByTestId('increment-btn');
		
		await fireEvent.click(incrementBtn);
		
		const status = screen.getByText(/Count is positive: 1/);
		expect(status).toBeInTheDocument();
		expect(status).toHaveClass('positive');
	});

	it('dispatches events when buttons are clicked', async () => {
		const { component } = render(Counter);
		
		const incrementHandler = vi.fn();
		const decrementHandler = vi.fn();
		const resetHandler = vi.fn();
		
		component.$on('increment', incrementHandler);
		component.$on('decrement', decrementHandler);
		component.$on('reset', resetHandler);
		
		const incrementBtn = screen.getByTestId('increment-btn');
		const resetBtn = screen.getByTestId('reset-btn');
		
		await fireEvent.click(incrementBtn);
		expect(incrementHandler).toHaveBeenCalledWith(
			expect.objectContaining({
				detail: { count: 1 }
			})
		);
		
		await fireEvent.click(resetBtn);
		expect(resetHandler).toHaveBeenCalledWith(
			expect.objectContaining({
				detail: { count: 0 }
			})
		);
	});

	it('handles rapid clicking correctly', async () => {
		render(Counter);
		
		const incrementBtn = screen.getByTestId('increment-btn');
		const countDisplay = screen.getByTestId('count');
		
		// Click rapidly 5 times
		for (let i = 0; i < 5; i++) {
			await fireEvent.click(incrementBtn);
		}
		
		expect(countDisplay).toHaveTextContent('5');
	});
});