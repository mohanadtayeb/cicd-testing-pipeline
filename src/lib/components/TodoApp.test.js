// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import { describe, it, expect, beforeEach } from 'vitest';
import TodoApp from './TodoApp.svelte';
// @ts-nocheck
describe('TodoApp Component', () => {
	beforeEach(() => {
		// Reset any global state if needed
	});

	it('renders with initial todos', () => {
		render(TodoApp);
		
		expect(screen.getByText('Todo Application')).toBeInTheDocument();
		expect(screen.getByTestId('new-todo-input')).toBeInTheDocument();
		
		// Check initial todos
		expect(screen.getByText('Write unit tests')).toBeInTheDocument();
		expect(screen.getByText('Set up CI/CD pipeline')).toBeInTheDocument();
		expect(screen.getByText('Add E2E tests')).toBeInTheDocument();
	});

	it('shows correct initial statistics', () => {
		render(TodoApp);
		
		expect(screen.getByText('Total: 3')).toBeInTheDocument();
		expect(screen.getByText('Active: 2')).toBeInTheDocument();
		expect(screen.getByText('Completed: 1')).toBeInTheDocument();
	});

	it('adds new todo when add button is clicked', async () => {
		render(TodoApp);
		
		const input = screen.getByTestId('new-todo-input');
		const addBtn = screen.getByTestId('add-todo-btn');
		
		await fireEvent.input(input, { target: { value: 'New test todo' } });
		await fireEvent.click(addBtn);
		
		expect(screen.getByText('New test todo')).toBeInTheDocument();
		expect(screen.getByText('Total: 4')).toBeInTheDocument();
		expect(screen.getByText('Active: 3')).toBeInTheDocument();
	});

	it('adds new todo when Enter key is pressed', async () => {
		render(TodoApp);
		
		const input = screen.getByTestId('new-todo-input');
		
		await fireEvent.input(input, { target: { value: 'Enter key todo' } });
		await fireEvent.keyDown(input, { key: 'Enter' });
		
		expect(screen.getByText('Enter key todo')).toBeInTheDocument();
	});

	it('does not add empty todos', async () => {
		render(TodoApp);
		
		const addBtn = screen.getByTestId('add-todo-btn');
		
		// Button should be disabled when input is empty
		expect(addBtn).toBeDisabled();
		
		// Try to add whitespace-only todo
		const input = screen.getByTestId('new-todo-input');
		await fireEvent.input(input, { target: { value: '   ' } });
		
		expect(addBtn).toBeDisabled();
	});

	it('toggles todo completion status', async () => {
		render(TodoApp);
		
		// Find the second todo (should be incomplete)
		const todoItems = screen.getAllByTestId('todo-item');
		const secondTodo = todoItems[1]; // "Set up CI/CD pipeline"
		const toggleButton = secondTodo.querySelector('[data-testid="todo-toggle"]');
		
		// Initially incomplete
		expect(secondTodo).not.toHaveClass('completed');
		
		await fireEvent.click(toggleButton);
		
		// Should now be completed
		expect(secondTodo).toHaveClass('completed');
		expect(screen.getByText('Active: 1')).toBeInTheDocument();
		expect(screen.getByText('Completed: 2')).toBeInTheDocument();
	});

	it('deletes todo when delete button is clicked', async () => {
		render(TodoApp);
		
		const initialTodos = screen.getAllByTestId('todo-item');
		expect(initialTodos).toHaveLength(3);
		
		// Delete the first todo
		const firstTodo = initialTodos[0];
		const deleteButton = firstTodo.querySelector('[data-testid="todo-delete"]');
		
		await fireEvent.click(deleteButton);
		
		const remainingTodos = screen.getAllByTestId('todo-item');
		expect(remainingTodos).toHaveLength(2);
		expect(screen.getByText('Total: 2')).toBeInTheDocument();
	});

	it('filters todos correctly', async () => {
		render(TodoApp);
		
		// All todos should be visible initially
		expect(screen.getAllByTestId('todo-item')).toHaveLength(3);
		
		// Filter to active only
		const activeFilter = screen.getByTestId('filter-active');
		await fireEvent.click(activeFilter);
		
		// Should show only 2 active todos
		expect(screen.getAllByTestId('todo-item')).toHaveLength(2);
		expect(activeFilter).toHaveClass('active');
		
		// Filter to completed only
		const completedFilter = screen.getByTestId('filter-completed');
		await fireEvent.click(completedFilter);
		
		// Should show only 1 completed todo
		expect(screen.getAllByTestId('todo-item')).toHaveLength(1);
		expect(completedFilter).toHaveClass('active');
		
		// Back to all
		const allFilter = screen.getByTestId('filter-all');
		await fireEvent.click(allFilter);
		
		expect(screen.getAllByTestId('todo-item')).toHaveLength(3);
		expect(allFilter).toHaveClass('active');
	});

	it('shows empty state for filters with no matching todos', async () => {
		render(TodoApp);
		
		// Mark all todos as completed first
		const todoItems = screen.getAllByTestId('todo-item');
		for (const item of todoItems) {
			const toggleButton = item.querySelector('[data-testid="todo-toggle"]');
			if (!item.classList.contains('completed')) {
				await fireEvent.click(toggleButton);
			}
		}
		
		// Filter to active - should show empty state
		const activeFilter = screen.getByTestId('filter-active');
		await fireEvent.click(activeFilter);
		
		expect(screen.getByTestId('empty-state')).toBeInTheDocument();
		expect(screen.getByText('No active todos. Great job! 🎉')).toBeInTheDocument();
	});

	it('clears completed todos', async () => {
		render(TodoApp);
		
		// Should show clear completed button
		const clearBtn = screen.getByTestId('clear-completed-btn');
		expect(clearBtn).toBeInTheDocument();
		expect(clearBtn).toHaveTextContent('Clear Completed (1)');
		
		await fireEvent.click(clearBtn);
		
		// Should only have active todos left
		expect(screen.getAllByTestId('todo-item')).toHaveLength(2);
		expect(screen.getByText('Total: 2')).toBeInTheDocument();
		expect(screen.getByText('Completed: 0')).toBeInTheDocument();
		
		// Clear button should be gone
		expect(screen.queryByTestId('clear-completed-btn')).not.toBeInTheDocument();
	});

	it('updates remaining items count correctly', async () => {
		render(TodoApp);
		
		// Initially should show "1 item left" (2 active todos)
		expect(screen.getByText('2 items left')).toBeInTheDocument();
		
		// Complete one more todo
		const todoItems = screen.getAllByTestId('todo-item');
		const activeTodo = todoItems.find(item => !item.classList.contains('completed'));
		const toggleButton = activeTodo.querySelector('[data-testid="todo-toggle"]');
		
		await fireEvent.click(toggleButton);
		
		// Should now show "1 item left"
		expect(screen.getByText('1 item left')).toBeInTheDocument();
	});

	it('handles singular vs plural items correctly', async () => {
		render(TodoApp);
		
		// Mark all but one as completed
		const todoItems = screen.getAllByTestId('todo-item');
		const activeTodos = todoItems.filter(item => !item.classList.contains('completed'));
		
		// Complete all but one
		for (let i = 0; i < activeTodos.length - 1; i++) {
			const toggleButton = activeTodos[i].querySelector('[data-testid="todo-toggle"]');
			await fireEvent.click(toggleButton);
		}
		
		// Should show singular "item"
		expect(screen.getByText('1 item left')).toBeInTheDocument();
	});

	it('clears input after adding todo', async () => {
		render(TodoApp);
		
		const input = screen.getByTestId('new-todo-input');
		const addBtn = screen.getByTestId('add-todo-btn');
		
		await fireEvent.input(input, { target: { value: 'Test todo' } });
		await fireEvent.click(addBtn);
		
		expect(input.value).toBe('');
	});
});