import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should load the main page successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/CI\/CD Testing Pipeline/);
		await expect(page.locator('h1')).toContainText('SvelteKit app with CI/CD Pipeline');
	});

	test('should have working navigation', async ({ page }) => {
		// Check if navigation elements are present
		await expect(page.locator('nav')).toBeVisible();
		await expect(page.locator('nav a[href="/"]')).toBeVisible();
		await expect(page.locator('nav a[href="/about"]')).toBeVisible();
		
		// Test navigation functionality
		await page.click('nav a[href="/about"]');
		await expect(page).toHaveURL('/about');
	});

	test('should display all demo sections', async ({ page }) => {
		// Check if all demo sections are visible
		await expect(page.getByText('Counter Component (Unit Testing Demo)')).toBeVisible();
		await expect(page.getByText('User Management (Integration Testing Demo)')).toBeVisible();
		await expect(page.getByText('API Integration (API Testing Demo)')).toBeVisible();
		await expect(page.getByText('Todo Application (E2E Testing Demo)')).toBeVisible();
	});

	test('should be responsive on mobile devices', async ({ page, isMobile }) => {
		if (isMobile) {
			// Check if mobile navigation toggle is visible
			await expect(page.locator('.nav-toggle')).toBeVisible();
			
			// Test mobile navigation
			await page.click('.nav-toggle');
			await expect(page.locator('.nav-links.open')).toBeVisible();
		}
	});
});