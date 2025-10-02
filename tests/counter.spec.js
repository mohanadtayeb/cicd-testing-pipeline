import { test, expect } from '@playwright/test';

test.describe('Counter Component E2E Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should interact with counter component', async ({ page }) => {
		const counterSection = page.locator('[data-testid="counter"]');
		const countDisplay = counterSection.locator('[data-testid="count"]');
		const incrementBtn = counterSection.locator('[data-testid="increment-btn"]');
		const decrementBtn = counterSection.locator('[data-testid="decrement-btn"]');
		const resetBtn = counterSection.locator('[data-testid="reset-btn"]');

		// Initial state
		await expect(countDisplay).toHaveText('0');
		await expect(decrementBtn).toBeDisabled();

		// Test increment
		await incrementBtn.click();
		await expect(countDisplay).toHaveText('1');
		await expect(decrementBtn).toBeEnabled();

		// Test status change
		await expect(counterSection.locator('.status.positive')).toBeVisible();
		await expect(counterSection.locator('.status.positive')).toContainText('Count is positive: 1');

		// Test multiple increments
		await incrementBtn.click();
		await incrementBtn.click();
		await expect(countDisplay).toHaveText('3');

		// Test decrement
		await decrementBtn.click();
		await expect(countDisplay).toHaveText('2');

		// Test reset
		await resetBtn.click();
		await expect(countDisplay).toHaveText('0');
		await expect(counterSection.locator('.status.neutral')).toBeVisible();
		await expect(decrementBtn).toBeDisabled();
	});

	test('should handle rapid clicking', async ({ page }) => {
		const counterSection = page.locator('[data-testid="counter"]');
		const countDisplay = counterSection.locator('[data-testid="count"]');
		const incrementBtn = counterSection.locator('[data-testid="increment-btn"]');

		// Rapid clicks
		for (let i = 0; i < 10; i++) {
			await incrementBtn.click();
		}

		await expect(countDisplay).toHaveText('10');
	});
});