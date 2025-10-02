<script>
// @ts-nocheck

	let todos = [
		{ id: 1, text: 'Write unit tests', completed: true },
		{ id: 2, text: 'Set up CI/CD pipeline', completed: false },
		{ id: 3, text: 'Add E2E tests', completed: false }
	];
	
	let newTodoText = '';
	let filter = 'all'; // all, active, completed

	function addTodo() {
		if (!newTodoText.trim()) return;
		
		const newTodo = {
			id: Date.now(),
			text: newTodoText.trim(),
			completed: false
		};
		
		todos = [...todos, newTodo];
		newTodoText = '';
	}

	function toggleTodo(id) {
		todos = todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
	}

	function deleteTodo(id) {
		todos = todos.filter(todo => todo.id !== id);
	}

	function clearCompleted() {
		todos = todos.filter(todo => !todo.completed);
	}

	function handleKeydown(event) {
		if (event.key === 'Enter') {
			addTodo();
		}
	}

	$: filteredTodos = todos.filter(todo => {
		if (filter === 'active') return !todo.completed;
		if (filter === 'completed') return todo.completed;
		return true;
	});

	$: activeTodos = todos.filter(todo => !todo.completed);
	$: completedTodos = todos.filter(todo => todo.completed);
</script>

<div class="todo-app" data-testid="todo-app">
	<h3>Todo Application</h3>
	
	<div class="todo-input" data-testid="todo-input">
		<input
			bind:value={newTodoText}
			on:keydown={handleKeydown}
			placeholder="What needs to be done?"
			data-testid="new-todo-input"
		/>
		<button 
			on:click={addTodo}
			disabled={!newTodoText.trim()}
			data-testid="add-todo-btn"
		>
			Add Todo
		</button>
	</div>

	<div class="todo-stats">
		<span class="stat">Total: {todos.length}</span>
		<span class="stat active">Active: {activeTodos.length}</span>
		<span class="stat completed">Completed: {completedTodos.length}</span>
	</div>

	<div class="todo-filters">
		<button 
			class:active={filter === 'all'}
			on:click={() => filter = 'all'}
			data-testid="filter-all"
		>
			All
		</button>
		<button 
			class:active={filter === 'active'}
			on:click={() => filter = 'active'}
			data-testid="filter-active"
		>
			Active
		</button>
		<button 
			class:active={filter === 'completed'}
			on:click={() => filter = 'completed'}
			data-testid="filter-completed"
		>
			Completed
		</button>
		
		{#if completedTodos.length > 0}
			<button 
				class="clear-completed"
				on:click={clearCompleted}
				data-testid="clear-completed-btn"
			>
				Clear Completed ({completedTodos.length})
			</button>
		{/if}
	</div>

	<div class="todo-list" data-testid="todo-list">
		{#if filteredTodos.length === 0}
			<div class="empty-state" data-testid="empty-state">
				{#if filter === 'all'}
					<p>No todos yet. Add one above!</p>
				{:else if filter === 'active'}
					<p>No active todos. Great job! 🎉</p>
				{:else}
					<p>No completed todos yet.</p>
				{/if}
			</div>
		{:else}
			{#each filteredTodos as todo (todo.id)}
				<div class="todo-item" class:completed={todo.completed} data-testid="todo-item">
					<button
						class="todo-toggle"
						on:click={() => toggleTodo(todo.id)}
						data-testid="todo-toggle"
						aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
					>
						{todo.completed ? '✓' : '○'}
					</button>
					
					<span class="todo-text" data-testid="todo-text">
						{todo.text}
					</span>
					
					<button
						class="todo-delete"
						on:click={() => deleteTodo(todo.id)}
						data-testid="todo-delete"
						aria-label="Delete todo"
					>
						×
					</button>
				</div>
			{/each}
		{/if}
	</div>

	{#if todos.length > 0}
		<div class="todo-footer">
			<p>
				{activeTodos.length} item{activeTodos.length !== 1 ? 's' : ''} left
			</p>
		</div>
	{/if}
</div>

<style>
	.todo-app {
		max-width: 600px;
		margin: 0 auto;
		padding: 1rem;
	}

	.todo-input {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.todo-input input {
		flex: 1;
		padding: 0.75rem;
		border: 2px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
	}

	.todo-input input:focus {
		outline: none;
		border-color: var(--color-theme-1);
	}

	.todo-input button {
		padding: 0.75rem 1.5rem;
		background: var(--color-theme-1);
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
	}

	.todo-input button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.todo-stats {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.stat {
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-weight: 500;
		background: #f0f0f0;
		color: #666;
		font-size: 0.9rem;
	}

	.stat.active {
		background: #fff3cd;
		color: #856404;
	}

	.stat.completed {
		background: #d4edda;
		color: #155724;
	}

	.todo-filters {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.todo-filters button {
		padding: 0.5rem 1rem;
		border: 2px solid var(--color-theme-2);
		background: white;
		color: var(--color-theme-2);
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
	}

	.todo-filters button.active {
		background: var(--color-theme-2);
		color: white;
	}

	.clear-completed {
		background: #dc3545 !important;
		border-color: #dc3545 !important;
		color: white !important;
	}

	.todo-list {
		background: white;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
		margin-bottom: 1rem;
	}

	.empty-state {
		padding: 2rem;
		text-align: center;
		color: #666;
	}

	.todo-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		border-bottom: 1px solid #eee;
		transition: all 0.2s ease;
	}

	.todo-item:last-child {
		border-bottom: none;
	}

	.todo-item:hover {
		background: #f8f9fa;
	}

	.todo-item.completed {
		opacity: 0.7;
		background: #f8fff8;
	}

	.todo-toggle {
		background: none;
		border: 2px solid var(--color-theme-1);
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.2rem;
		color: var(--color-theme-1);
	}

	.todo-item.completed .todo-toggle {
		background: #28a745;
		border-color: #28a745;
		color: white;
	}

	.todo-text {
		flex: 1;
		font-size: 1rem;
	}

	.todo-item.completed .todo-text {
		text-decoration: line-through;
	}

	.todo-delete {
		background: none;
		border: none;
		color: #dc3545;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0.25rem;
		border-radius: 4px;
		opacity: 0.7;
		transition: all 0.2s ease;
	}

	.todo-delete:hover {
		opacity: 1;
		background: rgba(220, 53, 69, 0.1);
	}

	.todo-footer {
		text-align: center;
		color: #666;
		font-size: 0.9rem;
	}

	.todo-footer p {
		margin: 0;
	}
</style>