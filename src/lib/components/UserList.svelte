<script>
    // @ts-nocheck
	import { onMount } from 'svelte';
	let users = [];
	let newUserName = '';
	let loading = false;
	let error = null;

	onMount(() => {
		loadUsers();
	});

	async function loadUsers() {
		loading = true;
		error = null;
		
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000));
			users = [
				{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', active: true },
				{ id: 2, name: 'Bob Smith', email: 'bob@example.com', active: false },
				{ id: 3, name: 'Carol Williams', email: 'carol@example.com', active: true }
			];
		} catch (err) {
			error = 'Failed to load users';
		} finally {
			loading = false;
		}
	}

	async function addUser() {
		if (!newUserName.trim()) return;
		
		loading = true;
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 500));
			
			const newUser = {
				id: users.length + 1,
				name: newUserName.trim(),
				email: `${newUserName.toLowerCase().replace(' ', '.')}@example.com`,
				active: true
			};
			
			users = [...users, newUser];
			newUserName = '';
		} catch (err) {
			error = 'Failed to add user';
		} finally {
			loading = false;
		}
	}

	async function toggleUserStatus(userId) {
		loading = true;
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 300));
			
			users = users.map(user => 
				user.id === userId 
					? { ...user, active: !user.active }
					: user
			);
		} catch (err) {
			error = 'Failed to update user status';
		} finally {
			loading = false;
		}
	}

	async function deleteUser(userId) {
		if (!confirm('Are you sure you want to delete this user?')) return;
		
		loading = true;
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 300));
			
			users = users.filter(user => user.id !== userId);
		} catch (err) {
			error = 'Failed to delete user';
		} finally {
			loading = false;
		}
	}

	$: activeUsers = users.filter(user => user.active);
	$: inactiveUsers = users.filter(user => !user.active);
</script>

<div class="user-list" data-testid="user-list">
	<h3>User Management System</h3>
	
	{#if error}
		<div class="error" data-testid="error-message">
			{error}
			<button on:click={() => error = null}>×</button>
		</div>
	{/if}

	<div class="add-user-form" data-testid="add-user-form">
		<input
			bind:value={newUserName}
			placeholder="Enter user name"
			data-testid="user-name-input"
			disabled={loading}
		/>
		<button 
			on:click={addUser} 
			disabled={loading || !newUserName.trim()}
			data-testid="add-user-btn"
		>
			{loading ? 'Adding...' : 'Add User'}
		</button>
	</div>

	{#if loading && users.length === 0}
		<div class="loading" data-testid="loading">Loading users...</div>
	{:else}
		<div class="user-stats">
			<span class="stat">Total: {users.length}</span>
			<span class="stat active">Active: {activeUsers.length}</span>
			<span class="stat inactive">Inactive: {inactiveUsers.length}</span>
		</div>

		<div class="users-container">
			{#each users as user (user.id)}
				<div class="user-card" class:active={user.active} data-testid="user-card">
					<div class="user-info">
						<h4>{user.name}</h4>
						<p>{user.email}</p>
						<span class="status-badge" class:active={user.active}>
							{user.active ? 'Active' : 'Inactive'}
						</span>
					</div>
					
					<div class="user-actions">
						<button 
							on:click={() => toggleUserStatus(user.id)}
							class="toggle-btn"
							data-testid="toggle-status-btn"
							disabled={loading}
						>
							{user.active ? 'Deactivate' : 'Activate'}
						</button>
						
						<button 
							on:click={() => deleteUser(user.id)}
							class="delete-btn"
							data-testid="delete-user-btn"
							disabled={loading}
						>
							Delete
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.user-list {
		padding: 1rem;
	}

	.error {
		background: #f8d7da;
		color: #721c24;
		padding: 1rem;
		border-radius: 4px;
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.error button {
		background: none;
		border: none;
		font-size: 1.2rem;
		cursor: pointer;
		color: #721c24;
	}

	.add-user-form {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.add-user-form input {
		flex: 1;
		padding: 0.75rem;
		border: 2px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
	}

	.add-user-form input:focus {
		outline: none;
		border-color: var(--color-theme-1);
	}

	.add-user-form button {
		padding: 0.75rem 1.5rem;
		background: var(--color-theme-1);
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
	}

	.add-user-form button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.loading {
		text-align: center;
		padding: 2rem;
		color: #666;
	}

	.user-stats {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		justify-content: center;
	}

	.stat {
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-weight: 500;
		background: #f0f0f0;
		color: #666;
	}

	.stat.active {
		background: #d4edda;
		color: #155724;
	}

	.stat.inactive {
		background: #f8d7da;
		color: #721c24;
	}

	.users-container {
		display: grid;
		gap: 1rem;
	}

	.user-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border: 2px solid #ddd;
		border-radius: 8px;
		background: white;
		transition: all 0.2s ease;
	}

	.user-card.active {
		border-color: #28a745;
	}

	.user-card:not(.active) {
		opacity: 0.7;
		border-color: #dc3545;
	}

	.user-info h4 {
		margin: 0 0 0.25rem 0;
		color: var(--color-theme-2);
	}

	.user-info p {
		margin: 0 0 0.5rem 0;
		color: #666;
		font-size: 0.9rem;
	}

	.status-badge {
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.8rem;
		font-weight: 500;
		background: #f8d7da;
		color: #721c24;
	}

	.status-badge.active {
		background: #d4edda;
		color: #155724;
	}

	.user-actions {
		display: flex;
		gap: 0.5rem;
	}

	.user-actions button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
	}

	.toggle-btn {
		background: var(--color-theme-2);
		color: white;
	}

	.delete-btn {
		background: #dc3545;
		color: white;
	}

	.user-actions button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>