import { test, expect } from '@playwright/test';

test.describe('Todo Application E2E Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should manage todos end-to-end', async ({ page }) => {
		const todoApp = page.locator('[data-testid="todo-app"]');
		const newTodoInput = todoApp.locator('[data-testid="new-todo-input"]');
		const addBtn = todoApp.locator('[data-testid="add-todo-btn"]');

		// Initial state - should have 3 todos
		const initialTodos = await todoApp.locator('[data-testid="todo-item"]').count();
		expect(initialTodos).toBe(3);

		// Add new todo
		await newTodoInput.fill('E2E Test Todo');
		await addBtn.click();

		// Verify todo was added
		await expect(todoApp.locator('[data-testid="todo-item"]')).toHaveCount(4);
		await expect(todoApp.getByText('E2E Test Todo')).toBeVisible();
		await expect(todoApp.getByText('Total: 4')).toBeVisible();

		// Test todo completion
		const newTodoItem = todoApp.locator('[data-testid="todo-item"]').filter({ hasText: 'E2E Test Todo' });
		const toggleBtn = newTodoItem.locator('[data-testid="todo-toggle"]');
		
		await toggleBtn.click();
		await expect(newTodoItem).toHaveClass(/completed/);

		// Test filtering
		const activeFilter = todoApp.locator('[data-testid="filter-active"]');
		await activeFilter.click();
		
		// Should not see completed todo in active filter
		await expect(todoApp.locator('[data-testid="todo-item"]').filter({ hasText: 'E2E Test Todo' })).not.toBeVisible();

		// Switch to completed filter
		const completedFilter = todoApp.locator('[data-testid="filter-completed"]');
		await completedFilter.click();
		
		// Should see our completed todo
		await expect(todoApp.locator('[data-testid="todo-item"]').filter({ hasText: 'E2E Test Todo' })).toBeVisible();

		// Clear completed todos
		const clearBtn = todoApp.locator('[data-testid="clear-completed-btn"]');
		await clearBtn.click();

		// Switch back to all todos - completed ones should be gone
		const allFilter = todoApp.locator('[data-testid="filter-all"]');
		await allFilter.click();
		
		await expect(todoApp.locator('[data-testid="todo-item"]').filter({ hasText: 'E2E Test Todo' })).not.toBeVisible();
	});

	test('should add todo with Enter key', async ({ page }) => {
		const todoApp = page.locator('[data-testid="todo-app"]');
		const newTodoInput = todoApp.locator('[data-testid="new-todo-input"]');

		await newTodoInput.fill('Enter Key Todo');
		await newTodoInput.press('Enter');

		await expect(todoApp.getByText('Enter Key Todo')).toBeVisible();
		await expect(newTodoInput).toHaveValue('');
	});

	test('should delete todos', async ({ page }) => {
		const todoApp = page.locator('[data-testid="todo-app"]');
		const initialCount = await todoApp.locator('[data-testid="todo-item"]').count();

		// Delete the first todo
		const firstTodo = todoApp.locator('[data-testid="todo-item"]').first();
		const deleteBtn = firstTodo.locator('[data-testid="todo-delete"]');
		
		await deleteBtn.click();

		// Verify todo was deleted
		await expect(todoApp.locator('[data-testid="todo-item"]')).toHaveCount(initialCount - 1);
	});

	test('should show correct statistics', async ({ page }) => {
		const todoApp = page.locator('[data-testid="todo-app"]');

		// Check initial statistics
		await expect(todoApp.getByText('Total: 3')).toBeVisible();
		await expect(todoApp.getByText('Active: 2')).toBeVisible();
		await expect(todoApp.getByText('Completed: 1')).toBeVisible();

		// Add a new todo and verify stats update
		const newTodoInput = todoApp.locator('[data-testid="new-todo-input"]');
		const addBtn = todoApp.locator('[data-testid="add-todo-btn"]');

		await newTodoInput.fill('Stats Test Todo');
		await addBtn.click();

		await expect(todoApp.getByText('Total: 4')).toBeVisible();
		await expect(todoApp.getByText('Active: 3')).toBeVisible();
		await expect(todoApp.getByText('Completed: 1')).toBeVisible();
	});

	test('should validate empty todo input', async ({ page }) => {
		const todoApp = page.locator('[data-testid="todo-app"]');
		const addBtn = todoApp.locator('[data-testid="add-todo-btn"]');

		// Button should be disabled when input is empty
		await expect(addBtn).toBeDisabled();

		// Try whitespace-only input
		const newTodoInput = todoApp.locator('[data-testid="new-todo-input"]');
		await newTodoInput.fill('   ');
		await expect(addBtn).toBeDisabled();

		// Valid input should enable button
		await newTodoInput.fill('Valid Todo');
		await expect(addBtn).toBeEnabled();
	});
});