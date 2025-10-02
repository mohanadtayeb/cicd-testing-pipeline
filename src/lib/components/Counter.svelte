<script>
    // @ts-nocheck
	import { createEventDispatcher } from 'svelte';
	
	let count = 0;
	const dispatch = createEventDispatcher();

	function increment() {
		count += 1;
		dispatch('increment', { count });
	}

	function decrement() {
		count -= 1;
		dispatch('decrement', { count });
	}

	function reset() {
		count = 0;
		dispatch('reset', { count });
	}

	export { count };
</script>

<div class="counter" data-testid="counter">
	<h3>Interactive Counter</h3>
	<div class="counter-display">
		<span class="count" data-testid="count">{count}</span>
	</div>
	
	<div class="counter-controls">
		<button 
			on:click={decrement} 
			data-testid="decrement-btn"
		>
			-
		</button>
		
		<button 
			on:click={reset} 
			data-testid="reset-btn"
		>
			Reset
		</button>
		
		<button 
			on:click={increment} 
			data-testid="increment-btn"
		>
			+
		</button>
	</div>
	
	<div class="counter-status">
		{#if count === 0}
			<p class="status neutral">Start counting!</p>
		{:else if count > 0}
			<p class="status positive">Count is positive: {count}</p>
		{:else}
			<p class="status negative">Count is negative: {count}</p>
		{/if}
	</div>
</div>

<style>
	.counter {
		text-align: center;
		padding: 1rem;
	}

	.counter-display {
		margin: 1rem 0;
	}

	.count {
		font-size: 3rem;
		font-weight: bold;
		color: var(--color-theme-1);
		display: inline-block;
		min-width: 4rem;
	}

	.counter-controls {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin: 1rem 0;
	}

	button {
		padding: 0.75rem 1.5rem;
		font-size: 1.1rem;
		border: 2px solid var(--color-theme-2);
		background: white;
		color: var(--color-theme-2);
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.2s ease;
		min-width: 60px;
	}

	button:hover:not(:disabled) {
		background: var(--color-theme-2);
		color: white;
		transform: translateY(-2px);
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}

	.counter-status {
		margin-top: 1rem;
	}

	.status {
		padding: 0.5rem 1rem;
		border-radius: 4px;
		margin: 0;
		font-weight: 500;
	}

	.status.neutral {
		background: #f0f0f0;
		color: #666;
	}

	.status.positive {
		background: #d4edda;
		color: #155724;
	}

	.status.negative {
		background: #f8d7da;
		color: #721c24;
	}
</style>