# 🚀 CI/CD Testing Pipeline with SvelteKit

A comprehensive demonstration of modern CI/CD testing strategies using SvelteKit, featuring unit tests, integration tests, end-to-end tests, and automated deployment pipelines.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Testing Strategy](#testing-strategy)
- [CI/CD Pipeline](#cicd-pipeline)
- [Docker Integration](#docker-integration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## 🎯 Overview

This project demonstrates a complete CI/CD testing pipeline with multiple testing levels:

- **Unit Tests** - Component-level testing with Vitest
- **Integration Tests** - API and service integration testing
- **End-to-End Tests** - Full user workflow testing with Playwright
- **Automated CI/CD** - GitHub Actions pipeline with quality gates

## ✨ Features

### 🧪 Multi-Level Testing
- **Unit Testing** with Vitest and Testing Library
- **Integration Testing** for API endpoints and services
- **E2E Testing** with Playwright across multiple browsers
- **Test Coverage** tracking with 80%+ threshold

### 🚀 CI/CD Pipeline
- **GitHub Actions** workflow automation
- **Multi-environment** testing (Node.js 18, 20)
- **Quality Gates** with coverage and security checks
- **Automated Deployment** to staging and production

### 🔒 Security & Quality
- **ESLint** code quality and consistency
- **Prettier** code formatting
- **Security Scanning** with npm audit and Trivy
- **Dependency Vulnerability** checks

### 🐳 Docker Integration
- **Multi-stage** Docker builds
- **Container Testing** in CI pipeline
- **Security Scanning** of Docker images
- **Health Checks** for containerized apps

## 🛠 Technology Stack

### Frontend
- **SvelteKit** - Modern web framework
- **Vite** - Fast build tool
- **JavaScript** - Programming language
- **CSS3** - Styling

### Testing
- **Vitest** - Unit testing framework
- **Testing Library** - Component testing utilities
- **Playwright** - E2E testing framework
- **JSDOM** - DOM simulation

### CI/CD & DevOps
- **GitHub Actions** - CI/CD automation
- **Docker** - Containerization
- **Node.js** - Runtime environment
- **npm** - Package management

### Quality & Security
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Codecov** - Coverage reporting
- **Trivy** - Security scanning

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohanadtayeb/cicd-testing-pipeline.git
   cd cicd-testing-pipeline
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Testing
npm test               # Run unit tests with coverage
npm run test:watch     # Run tests in watch mode
npm run test:integration # Run integration tests
npm run test:e2e       # Run E2E tests
npm run test:e2e:open  # Open Playwright test UI

# Quality
npm run lint           # Check code quality
npm run lint:fix       # Fix linting issues
npm run format         # Format code with Prettier
npm run check          # Type check Svelte files

# Docker
npm run build:docker   # Build Docker image
npm run test:docker    # Test Docker container
```

## 🧪 Testing Strategy

### Unit Tests
- **Location**: `src/**/*.test.js`
- **Framework**: Vitest + Testing Library
- **Coverage**: 80%+ requirement
- **Focus**: Component logic, user interactions, state management

### Integration Tests
- **Location**: `tests/integration/**/*.test.js`
- **Framework**: Vitest + Axios
- **Focus**: API integrations, external services, data flow

### End-to-End Tests
- **Location**: `tests/**/*.spec.js`
- **Framework**: Playwright
- **Browsers**: Chrome, Firefox, Safari, Mobile
- **Focus**: User workflows, critical paths, cross-browser compatibility

### Test Coverage

| Type | Threshold | Current |
|------|-----------|---------|
| Statements | 80% | ![Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen) |
| Branches | 80% | ![Coverage](https://img.shields.io/badge/coverage-82%25-brightgreen) |
| Functions | 80% | ![Coverage](https://img.shields.io/badge/coverage-88%25-brightgreen) |
| Lines | 80% | ![Coverage](https://img.shields.io/badge/coverage-86%25-brightgreen) |

## 🔄 CI/CD Pipeline

The pipeline is defined in `.github/workflows/ci.yml` and includes:

### 🧪 Test Stage
- **Multi-node testing** (Node.js 18, 20)
- **Code linting** with ESLint
- **Unit test execution** with coverage
- **Test artifact upload**

### 🏗️ Build Stage
- **Application build**
- **Build artifact storage**
- **Build verification**

### 🔗 Integration Stage
- **Integration test execution**
- **API endpoint validation**
- **Service integration verification**

### 🎭 E2E Stage
- **Cross-browser testing**
- **User workflow validation**
- **Performance testing**

### 🔒 Security Stage
- **Dependency audit**
- **Vulnerability scanning**
- **Security report generation**

### 🐳 Docker Stage
- **Container image build**
- **Container testing**
- **Security scanning**

### ✅ Quality Gate
- **Coverage threshold check**
- **Test result validation**
- **Security approval**
- **Quality metrics validation**

### 🚀 Deployment
- **Staging deployment** (develop branch)
- **Production deployment** (main branch)
- **Smoke testing**
- **Rollback capability**

## 🐳 Docker Integration

### Build Docker Image
```bash
npm run build:docker
# or
docker build -t cicd-testing-pipeline-svelte .
```

### Run Container
```bash
docker run -p 3000:3000 cicd-testing-pipeline-svelte
```

### Test Container
```bash
npm run test:docker
# or
docker run --rm cicd-testing-pipeline-svelte npm test
```

### Multi-stage Build
The Dockerfile uses multi-stage builds for optimization:
- **Builder stage**: Installs dependencies and builds application
- **Runner stage**: Minimal production image with security considerations

## 📁 Project Structure

```
cicd-testing-pipeline/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions pipeline
├── src/
│   ├── lib/
│   │   └── components/           # Svelte components
│   │       ├── Counter.svelte
│   │       ├── Counter.test.js   # Unit tests
│   │       ├── TodoApp.svelte
│   │       └── TodoApp.test.js
│   ├── routes/                   # SvelteKit routes
│   │   ├── +page.svelte         # Home page
│   │   └── about/
│   │       └── +page.svelte     # About page
│   ├── app.html                 # HTML template
│   ├── app.svelte              # Root component
│   └── setupTests.js           # Test setup
├── tests/
│   ├── integration/            # Integration tests
│   │   ├── setup.js
│   │   └── api.test.js
│   ├── e2e/                   # E2E tests
│   │   └── todo.spec.js
│   ├── homepage.spec.js       # Page tests
│   └── counter.spec.js
├── Dockerfile                 # Container definition
├── docker-compose.yml         # Multi-container setup
├── playwright.config.js       # E2E test config
├── vitest.config.js           # Unit test config
├── svelte.config.js          # SvelteKit config
└── package.json              # Dependencies & scripts
```

## 🔧 Configuration Files

### Testing Configuration
- `vitest.config.js` - Unit test configuration
- `playwright.config.js` - E2E test configuration
- `jest.integration.config.js` - Integration test configuration

### Quality Configuration
- `.eslintrc.json` - ESLint rules
- `.prettierrc` - Prettier formatting rules
- `svelte.config.js` - SvelteKit configuration

### CI/CD Configuration
- `.github/workflows/ci.yml` - GitHub Actions pipeline
- `Dockerfile` - Container configuration
- `.dockerignore` - Docker ignore rules

## 📊 Pipeline Status

![CI/CD Pipeline](https://github.com/yourusername/cicd-testing-pipeline/workflows/CI/CD%20Testing%20Pipeline/badge.svg)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Security](https://img.shields.io/badge/security-passing-brightgreen)

## 🎯 Quality Gates

The pipeline enforces the following quality gates:

- ✅ **Test Coverage**: Minimum 80% coverage
- ✅ **All Tests Pass**: No failing unit, integration, or E2E tests
- ✅ **Code Quality**: ESLint passes with no errors
- ✅ **Security**: No high-severity vulnerabilities
- ✅ **Build Success**: Application builds without errors
- ✅ **Container Security**: Docker image passes security scan

## 🚀 Deployment Environments

### Staging Environment
- **Trigger**: Push to `develop` branch
- **URL**: `https://staging.your-domain.com`
- **Purpose**: Pre-production testing and validation

### Production Environment
- **Trigger**: Push to `main` branch
- **URL**: `https://your-domain.com`
- **Purpose**: Live application serving users

## 📈 Monitoring & Reporting

### Test Reports
- **Unit Test Reports**: Generated by Vitest
- **E2E Test Reports**: Generated by Playwright
- **Coverage Reports**: Generated by c8/v8

### CI/CD Artifacts
- **Test Results**: XML and JSON format
- **Coverage Reports**: LCOV and HTML format
- **Build Artifacts**: Compiled application
- **Docker Images**: Tagged container images

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Run tests**: `npm test`
5. **Run linting**: `npm run lint`
6. **Commit changes**: `git commit -m 'Add amazing feature'`
7. **Push to branch**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

### Development Guidelines

- **Write tests** for all new features
- **Maintain test coverage** above 80%
- **Follow code style** guidelines (ESLint + Prettier)
- **Update documentation** for significant changes
- **Use conventional commits** for clear history

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SvelteKit Team** - For the amazing framework
- **Vitest Team** - For the excellent testing experience
- **Playwright Team** - For comprehensive E2E testing
- **GitHub** - For free CI/CD with GitHub Actions

## 📞 Contact & Connect

**Project Author**: Mohanad Tayeb  
**Purpose**: Software Testing & QA Skills Demonstration  
**LinkedIn**: [Connect with me](https://linkedin.com/in/your-profile)  
**Portfolio**: [View more projects](https://mohanad-tayeb.netlify.app/)
---

**Happy Testing! 🚀**
