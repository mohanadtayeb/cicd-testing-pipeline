<script>
    // @ts-nocheck
	import { page } from '$app/stores';

	let navOpen = false;

	function toggleNav() {
		navOpen = !navOpen;
	}
</script>

<header>
	<nav>
		<div class="nav-brand">
			<a href="/">
				<span class="logo">🚀</span>
				CI/CD Pipeline
			</a>
		</div>
		
		<button class="nav-toggle" on:click={toggleNav} aria-label="Toggle navigation">
			☰
		</button>

		<ul class="nav-links" class:open={navOpen}>
			<li>
				<a href="/" class:active={$page.url.pathname === '/'}>Home</a>
			</li>
			<li>
				<a href="/about" class:active={$page.url.pathname === '/about'}>About</a>
			</li>
			<li>
				<a href="/tests" class:active={$page.url.pathname === '/tests'}>Test Reports</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 64rem;
		margin: 0 auto;
		padding: 1rem;
	}

	.nav-brand a {
		display: flex;
		align-items: center;
		font-size: 1.5rem;
		font-weight: bold;
		color: var(--color-theme-2);
		text-decoration: none;
	}

	.logo {
		margin-right: 0.5rem;
		font-size: 2rem;
	}

	.nav-toggle {
		display: none;
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: var(--color-theme-2);
	}

	.nav-links {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 2rem;
	}

	.nav-links a {
		color: var(--color-text);
		text-decoration: none;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		transition: all 0.2s ease;
	}

	.nav-links a:hover,
	.nav-links a.active {
		background: var(--color-theme-1);
		color: white;
	}

	@media (max-width: 768px) {
		.nav-toggle {
			display: block;
		}

		.nav-links {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background: white;
			flex-direction: column;
			gap: 0;
			padding: 1rem;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
			transform: translateY(-100%);
			opacity: 0;
			pointer-events: none;
			transition: all 0.3s ease;
		}

		.nav-links.open {
			transform: translateY(0);
			opacity: 1;
			pointer-events: auto;
		}

		.nav-links a {
			padding: 1rem;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		}
	}
</style>