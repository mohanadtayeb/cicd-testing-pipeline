<script>
    // @ts-nocheck
</script>
<svelte:head>
	<title>About - CI/CD Testing Pipeline</title>
	<meta name="description" content="Learn about our comprehensive CI/CD testing pipeline" />
</svelte:head>

<section class="about">
	<h1>About This Project</h1>
	
	<div class="intro">
		<p>
			This is a comprehensive demonstration of a CI/CD testing pipeline built with SvelteKit. 
			It showcases modern web development practices, testing strategies, and automated deployment workflows.
		</p>
	</div>

	<div class="features-grid">
		<div class="feature-card">
			<h2>🧪 Multi-Level Testing</h2>
			<ul>
				<li><strong>Unit Tests</strong> - Component testing with Vitest</li>
				<li><strong>Integration Tests</strong> - API and service testing</li>
				<li><strong>E2E Tests</strong> - End-to-end user workflows with Playwright</li>
			</ul>
		</div>

		<div class="feature-card">
			<h2>🚀 CI/CD Pipeline</h2>
			<ul>
				<li><strong>GitHub Actions</strong> - Automated testing and deployment</li>
				<li><strong>Quality Gates</strong> - 80%+ test coverage requirements</li>
				<li><strong>Multi-Environment</strong> - Staging and production deployments</li>
			</ul>
		</div>

		<div class="feature-card">
			<h2>🔒 Security & Quality</h2>
			<ul>
				<li><strong>Code Linting</strong> - ESLint for code quality</li>
				<li><strong>Security Scanning</strong> - Dependency vulnerability checks</li>
				<li><strong>Docker Integration</strong> - Containerized testing and deployment</li>
			</ul>
		</div>

		<div class="feature-card">
			<h2>📊 Monitoring & Reporting</h2>
			<ul>
				<li><strong>Test Reports</strong> - Detailed test execution results</li>
				<li><strong>Coverage Reports</strong> - Code coverage tracking</li>
				<li><strong>Performance Metrics</strong> - Build and test performance</li>
			</ul>
		</div>
	</div>

	<div class="tech-stack">
		<h2>Technology Stack</h2>
		
		<div class="tech-categories">
			<div class="tech-category">
				<h3>Frontend</h3>
				<div class="tech-badges">
					<span class="tech-badge">SvelteKit</span>
					<span class="tech-badge">Vite</span>
					<span class="tech-badge">JavaScript</span>
					<span class="tech-badge">CSS3</span>
				</div>
			</div>

			<div class="tech-category">
				<h3>Testing</h3>
				<div class="tech-badges">
					<span class="tech-badge">Vitest</span>
					<span class="tech-badge">Testing Library</span>
					<span class="tech-badge">Playwright</span>
					<span class="tech-badge">JSDOM</span>
				</div>
			</div>

			<div class="tech-category">
				<h3>CI/CD</h3>
				<div class="tech-badges">
					<span class="tech-badge">GitHub Actions</span>
					<span class="tech-badge">Docker</span>
					<span class="tech-badge">Node.js</span>
					<span class="tech-badge">ESLint</span>
				</div>
			</div>

			<div class="tech-category">
				<h3>Tools</h3>
				<div class="tech-badges">
					<span class="tech-badge">Prettier</span>
					<span class="tech-badge">Axios</span>
					<span class="tech-badge">Codecov</span>
					<span class="tech-badge">Trivy</span>
				</div>
			</div>
		</div>
	</div>

	<div class="architecture">
		<h2>Pipeline Architecture</h2>
		
		<div class="pipeline-flow">
			<div class="pipeline-stage">
				<h4>🔄 Trigger</h4>
				<p>Push/PR to main/develop branches</p>
			</div>
			<div class="arrow">→</div>
			<div class="pipeline-stage">
				<h4>🧪 Test</h4>
				<p>Unit, Integration, E2E tests</p>
			</div>
			<div class="arrow">→</div>
			<div class="pipeline-stage">
				<h4>🏗️ Build</h4>
				<p>Application build & Docker image</p>
			</div>
			<div class="arrow">→</div>
			<div class="pipeline-stage">
				<h4>🔒 Security</h4>
				<p>Vulnerability scanning</p>
			</div>
			<div class="arrow">→</div>
			<div class="pipeline-stage">
				<h4>✅ Quality Gate</h4>
				<p>Coverage & quality checks</p>
			</div>
			<div class="arrow">→</div>
			<div class="pipeline-stage">
				<h4>🚀 Deploy</h4>
				<p>Staging/Production deployment</p>
			</div>
		</div>
	</div>

	<div class="benefits">
		<h2>Benefits Demonstrated</h2>
		
		<div class="benefits-list">
			<div class="benefit">
				<h4>🚀 Faster Development</h4>
				<p>Automated testing catches issues early, reducing development time and debugging.</p>
			</div>
			
			<div class="benefit">
				<h4>🔒 Higher Quality</h4>
				<p>Multiple testing layers ensure robust, reliable software with fewer bugs in production.</p>
			</div>
			
			<div class="benefit">
				<h4>📈 Improved Confidence</h4>
				<p>Comprehensive test coverage gives confidence in deployments and code changes.</p>
			</div>
			
			<div class="benefit">
				<h4>🔄 Continuous Delivery</h4>
				<p>Automated pipelines enable frequent, reliable deployments with minimal manual intervention.</p>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		text-align: center;
		color: var(--color-theme-2);
		margin-bottom: 2rem;
	}

	.intro {
		text-align: center;
		max-width: 800px;
		margin: 0 auto 3rem;
		font-size: 1.1rem;
		line-height: 1.6;
		color: var(--color-theme-2);
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.feature-card {
		background: rgba(255, 255, 255, 0.9);
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		border: 2px solid transparent;
		transition: all 0.3s ease;
	}

	.feature-card:hover {
		border-color: var(--color-theme-1);
		transform: translateY(-4px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
	}

	.feature-card h2 {
		color: var(--color-theme-2);
		margin-bottom: 1rem;
		font-size: 1.3rem;
	}

	.feature-card ul {
		list-style: none;
		padding: 0;
	}

	.feature-card li {
		padding: 0.5rem 0;
		border-bottom: 1px solid #eee;
	}

	.feature-card li:last-child {
		border-bottom: none;
	}

	.tech-stack {
		margin: 3rem 0;
	}

	.tech-stack h2 {
		text-align: center;
		color: var(--color-theme-2);
		margin-bottom: 2rem;
	}

	.tech-categories {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}

	.tech-category h3 {
		color: var(--color-theme-1);
		margin-bottom: 1rem;
		text-align: center;
	}

	.tech-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
	}

	.tech-badge {
		background: var(--color-theme-2);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: 500;
	}

	.architecture {
		margin: 3rem 0;
		text-align: center;
	}

	.architecture h2 {
		color: var(--color-theme-2);
		margin-bottom: 2rem;
	}

	.pipeline-flow {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin: 2rem 0;
	}

	.pipeline-stage {
		background: rgba(255, 255, 255, 0.9);
		padding: 1.5rem;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		min-width: 150px;
		border: 2px solid var(--color-theme-1);
	}

	.pipeline-stage h4 {
		margin: 0 0 0.5rem 0;
		color: var(--color-theme-1);
		font-size: 1.1rem;
	}

	.pipeline-stage p {
		margin: 0;
		font-size: 0.9rem;
		color: #666;
	}

	.arrow {
		font-size: 1.5rem;
		color: var(--color-theme-1);
		font-weight: bold;
	}

	.benefits {
		margin: 3rem 0;
	}

	.benefits h2 {
		text-align: center;
		color: var(--color-theme-2);
		margin-bottom: 2rem;
	}

	.benefits-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.benefit {
		background: rgba(255, 255, 255, 0.9);
		padding: 1.5rem;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.benefit h4 {
		margin: 0 0 1rem 0;
		color: var(--color-theme-1);
		font-size: 1.1rem;
	}

	.benefit p {
		margin: 0;
		line-height: 1.6;
		color: #666;
	}

	@media (max-width: 768px) {
		.pipeline-flow {
			flex-direction: column;
		}

		.arrow {
			transform: rotate(90deg);
		}

		.features-grid {
			grid-template-columns: 1fr;
		}
	}
</style>