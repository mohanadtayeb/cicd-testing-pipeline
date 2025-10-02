// Setup for integration tests
import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';

beforeAll(async () => {
	// Global setup for all integration tests
	console.log('Setting up integration test environment...');
});

afterAll(async () => {
	// Global cleanup after all integration tests
	console.log('Cleaning up integration test environment...');
});

beforeEach(() => {
	// Setup before each test
});

afterEach(() => {
	// Cleanup after each test
});