<script>
    // @ts-nocheck
</script>
<footer>
	<div class="footer-content">
		<div class="footer-section">
			<h3>CI/CD Testing Pipeline</h3>
			<p>Demonstrating comprehensive testing strategies with SvelteKit</p>
		</div>
		
		<div class="footer-section">
			<h4>Testing Levels</h4>
			<ul>
				<li>Unit Tests</li>
				<li>Integration Tests</li>
				<li>End-to-End Tests</li>
			</ul>
		</div>
		
		<div class="footer-section">
			<h4>Technologies</h4>
			<ul>
				<li>SvelteKit</li>
				<li>Vitest</li>
				<li>Playwright</li>
				<li>GitHub Actions</li>
			</ul>
		</div>
	</div>
	
	<div class="footer-bottom">
		<p>&copy; 2025 CI/CD Testing Pipeline Demo. Built with ❤️ and Svelte.</p>
	</div>
</footer>

<style>
	footer {
		background: var(--color-theme-2);
		color: white;
		margin-top: auto;
	}

	.footer-content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		max-width: 64rem;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.footer-section h3,
	.footer-section h4 {
		margin: 0 0 1rem 0;
		color: var(--color-theme-1);
	}

	.footer-section ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.footer-section li {
		padding: 0.25rem 0;
		opacity: 0.9;
	}

	.footer-bottom {
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		text-align: center;
		padding: 1rem;
		opacity: 0.8;
	}

	.footer-bottom p {
		margin: 0;
	}
</style>