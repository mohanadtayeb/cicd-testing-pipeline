<script>
    // @ts-nocheck
	import Counter from '$components/Counter.svelte';
	import UserList from '$components/UserList.svelte';
	import ApiDemo from '$components/ApiDemo.svelte';
	import TodoApp from '$components/TodoApp.svelte';
</script>

<svelte:head>
	<title>Home - CI/CD Testing Pipeline</title>
	<meta name="description" content="SvelteKit CI/CD Testing Pipeline Demo" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			🚀
		</span>
		Welcome to your new<br />SvelteKit app with CI/CD Pipeline
	</h1>

	<p class="intro">
		This application demonstrates comprehensive testing strategies including unit tests, 
		integration tests, and end-to-end tests, all integrated with a robust CI/CD pipeline.
	</p>

	<div class="demo-grid">
		<div class="demo-section">
			<h2>Counter Component (Unit Testing Demo)</h2>
			<Counter />
		</div>

		<div class="demo-section">
			<h2>User Management (Integration Testing Demo)</h2>
			<UserList />
		</div>

		<div class="demo-section">
			<h2>API Integration (API Testing Demo)</h2>
			<ApiDemo />
		</div>

		<div class="demo-section">
			<h2>Todo Application (E2E Testing Demo)</h2>
			<TodoApp />
		</div>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
		padding: 2rem;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		text-align: center;
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.intro {
		text-align: center;
		max-width: 600px;
		margin-bottom: 2rem;
		font-size: 1.1rem;
		color: var(--color-theme-2);
	}

	.demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		width: 100%;
		max-width: 1200px;
	}

	.demo-section {
		background: rgba(255, 255, 255, 0.8);
		padding: 1.5rem;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.demo-section h2 {
		margin-top: 0;
		color: var(--color-theme-2);
		border-bottom: 2px solid var(--color-theme-1);
		padding-bottom: 0.5rem;
	}
</style>