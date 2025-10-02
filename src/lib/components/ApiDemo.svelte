<script>
    // @ts-nocheck
	import axios from 'axios';
	
	let apiData = null;
	let loading = false;
	let error = null;
	let selectedEndpoint = 'users';

	const endpoints = {
		users: 'https://jsonplaceholder.typicode.com/users',
		posts: 'https://jsonplaceholder.typicode.com/posts',
		todos: 'https://jsonplaceholder.typicode.com/todos'
	};

	async function fetchData() {
		loading = true;
		error = null;
		apiData = null;

		try {
			const response = await axios.get(endpoints[selectedEndpoint]);
			apiData = selectedEndpoint === 'users' 
				? response.data.slice(0, 5) 
				: response.data.slice(0, 10);
		} catch (err) {
			error = `Failed to fetch ${selectedEndpoint}: ${err.message}`;
		} finally {
			loading = false;
		}
	}

	function handleEndpointChange() {
		apiData = null;
		error = null;
	}
</script>

<div class="api-demo" data-testid="api-demo">
	<h3>API Integration Demo</h3>
	
	<div class="endpoint-selector">
		<label for="endpoint-select">Choose API Endpoint:</label>
		<select 
			id="endpoint-select"
			bind:value={selectedEndpoint} 
			on:change={handleEndpointChange}
			data-testid="endpoint-select"
		>
			<option value="users">Users</option>
			<option value="posts">Posts</option>
			<option value="todos">Todos</option>
		</select>
		
		<button 
			on:click={fetchData} 
			disabled={loading}
			data-testid="fetch-btn"
		>
			{loading ? 'Fetching...' : `Fetch ${selectedEndpoint}`}
		</button>
	</div>

	{#if error}
		<div class="error" data-testid="error-message">
			{error}
		</div>
	{/if}

	{#if loading}
		<div class="loading" data-testid="loading">
			<div class="spinner"></div>
			<p>Loading {selectedEndpoint}...</p>
		</div>
	{/if}

	{#if apiData && !loading}
		<div class="api-results" data-testid="api-results">
			<h4>Results ({apiData.length} items):</h4>
			
			{#if selectedEndpoint === 'users'}
				<div class="users-grid">
					{#each apiData as user}
						<div class="user-card" data-testid="user-item">
							<h5>{user.name}</h5>
							<p>@{user.username}</p>
							<p>{user.email}</p>
							<p>{user.address.city}</p>
						</div>
					{/each}
				</div>
			{:else if selectedEndpoint === 'posts'}
				<div class="posts-list">
					{#each apiData as post}
						<div class="post-card" data-testid="post-item">
							<h5>{post.title}</h5>
							<p>{post.body}</p>
							<small>Post ID: {post.id} | User: {post.userId}</small>
						</div>
					{/each}
				</div>
			{:else if selectedEndpoint === 'todos'}
				<div class="todos-list">
					{#each apiData as todo}
						<div class="todo-card" class:completed={todo.completed} data-testid="todo-item">
							<span class="todo-status">{todo.completed ? '✓' : '○'}</span>
							<span class="todo-title">{todo.title}</span>
							<small>User: {todo.userId}</small>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.api-demo {
		padding: 1rem;
	}

	.endpoint-selector {
		display: flex;
		gap: 1rem;
		align-items: center;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	label {
		font-weight: 500;
		color: var(--color-theme-2);
	}

	select {
		padding: 0.5rem;
		border: 2px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
		background: white;
	}

	select:focus {
		outline: none;
		border-color: var(--color-theme-1);
	}

	button {
		padding: 0.75rem 1.5rem;
		background: var(--color-theme-1);
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
		transition: all 0.2s ease;
	}

	button:hover:not(:disabled) {
		background: #e63300;
		transform: translateY(-2px);
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}

	.error {
		background: #f8d7da;
		color: #721c24;
		padding: 1rem;
		border-radius: 4px;
		margin-bottom: 1rem;
	}

	.loading {
		text-align: center;
		padding: 2rem;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f3f3;
		border-top: 4px solid var(--color-theme-1);
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 1rem;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.api-results {
		margin-top: 1.5rem;
	}

	.api-results h4 {
		color: var(--color-theme-2);
		margin-bottom: 1rem;
	}

	.users-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.user-card {
		background: white;
		padding: 1rem;
		border: 2px solid #ddd;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
	}

	.user-card h5 {
		margin: 0 0 0.5rem 0;
		color: var(--color-theme-2);
	}

	.user-card p {
		margin: 0.25rem 0;
		color: #666;
		font-size: 0.9rem;
	}

	.posts-list,
	.todos-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.post-card {
		background: white;
		padding: 1rem;
		border: 2px solid #ddd;
		border-radius: 8px;
	}

	.post-card h5 {
		margin: 0 0 0.5rem 0;
		color: var(--color-theme-2);
		text-transform: capitalize;
	}

	.post-card p {
		margin: 0 0 0.5rem 0;
		color: #666;
		line-height: 1.4;
	}

	.post-card small {
		color: #999;
	}

	.todo-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		background: white;
		padding: 1rem;
		border: 2px solid #ddd;
		border-radius: 8px;
	}

	.todo-card.completed {
		border-color: #28a745;
		background: #f8fff8;
	}

	.todo-status {
		font-size: 1.5rem;
		color: var(--color-theme-1);
	}

	.todo-card.completed .todo-status {
		color: #28a745;
	}

	.todo-title {
		flex: 1;
		text-transform: capitalize;
		text-decoration: none;
	}

	.todo-card.completed .todo-title {
		text-decoration: line-through;
		opacity: 0.7;
	}

	.todo-card small {
		color: #999;
	}
</style>