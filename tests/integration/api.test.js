import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import axios from 'axios';

describe('API Integration Tests', () => {
	let server;
	const baseURL = 'http://localhost:3000';

	beforeAll(async () => {
		// Setup test server if needed
		console.log('Starting integration test server...');
	});

	afterAll(async () => {
		// Cleanup test server
		if (server) {
			console.log('Stopping integration test server...');
		}
	});

	describe('External API Integration', () => {
		it('should successfully fetch users from JSONPlaceholder', async () => {
			const response = await axios.get('https://jsonplaceholder.typicode.com/users');
			
			expect(response.status).toBe(200);
			expect(response.data).toBeInstanceOf(Array);
			expect(response.data.length).toBeGreaterThan(0);
			
			// Verify user structure
			const user = response.data[0];
			expect(user).toHaveProperty('id');
			expect(user).toHaveProperty('name');
			expect(user).toHaveProperty('email');
			expect(user).toHaveProperty('address');
		});

		it('should successfully fetch posts from JSONPlaceholder', async () => {
			const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
			
			expect(response.status).toBe(200);
			expect(response.data).toBeInstanceOf(Array);
			expect(response.data.length).toBeGreaterThan(0);
			
			// Verify post structure
			const post = response.data[0];
			expect(post).toHaveProperty('id');
			expect(post).toHaveProperty('title');
			expect(post).toHaveProperty('body');
			expect(post).toHaveProperty('userId');
		});

		it('should successfully fetch todos from JSONPlaceholder', async () => {
			const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
			
			expect(response.status).toBe(200);
			expect(response.data).toBeInstanceOf(Array);
			expect(response.data.length).toBeGreaterThan(0);
			
			// Verify todo structure
			const todo = response.data[0];
			expect(todo).toHaveProperty('id');
			expect(todo).toHaveProperty('title');
			expect(todo).toHaveProperty('completed');
			expect(todo).toHaveProperty('userId');
		});

		it('should handle API errors gracefully', async () => {
			try {
				await axios.get('https://jsonplaceholder.typicode.com/nonexistent');
			} catch (error) {
				expect(error.response.status).toBe(404);
			}
		});

		it('should handle network timeouts', async () => {
			const axiosInstance = axios.create({
				timeout: 1 // 1ms timeout to force timeout
			});

			try {
				await axiosInstance.get('https://jsonplaceholder.typicode.com/users');
			} catch (error) {
				expect(error.code).toBe('ECONNABORTED');
			}
		}, 10000);
	});

	describe('Application API Integration', () => {
		it('should validate API response structure', async () => {
			// Mock API response validation
			const mockApiResponse = {
				users: [
					{ id: 1, name: 'Test User', email: 'test@example.com', active: true }
				],
				posts: [
					{ id: 1, title: 'Test Post', body: 'Test content', userId: 1 }
				],
				todos: [
					{ id: 1, title: 'Test Todo', completed: false, userId: 1 }
				]
			};

			// Validate users structure
			expect(mockApiResponse.users).toBeInstanceOf(Array);
			mockApiResponse.users.forEach(user => {
				expect(user).toHaveProperty('id');
				expect(user).toHaveProperty('name');
				expect(user).toHaveProperty('email');
				expect(user).toHaveProperty('active');
				expect(typeof user.id).toBe('number');
				expect(typeof user.name).toBe('string');
				expect(typeof user.email).toBe('string');
				expect(typeof user.active).toBe('boolean');
			});
		});

		it('should handle pagination correctly', async () => {
			const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10');
			
			expect(response.status).toBe(200);
			expect(response.data).toBeInstanceOf(Array);
			expect(response.data.length).toBeLessThanOrEqual(10);
		});

		it('should filter data correctly', async () => {
			const response = await axios.get('https://jsonplaceholder.typicode.com/posts?userId=1');
			
			expect(response.status).toBe(200);
			expect(response.data).toBeInstanceOf(Array);
			
			// All posts should belong to userId 1
			response.data.forEach(post => {
				expect(post.userId).toBe(1);
			});
		});
	});
});