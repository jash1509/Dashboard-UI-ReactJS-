import axios from 'axios';

// Initialize Axios instance
const apiClient = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to delay execution (simulates network latency)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Request Interceptor to simulate slow connection or force errors
apiClient.interceptors.request.use(
  async (config) => {
    // Read simulation flags from global window settings
    const settings = window.__dashboardConfig || { simulateSlow: false, simulateError: false };

    // 1. Simulate Slow Connection
    if (settings.simulateSlow) {
      await delay(2000); // 2 seconds artificial delay
    }

    // 2. Simulate API Error
    if (settings.simulateError) {
      // Return a rejected promise that mimics an Axios error
      const error = new Error('Simulated API Server Error (500)');
      error.response = {
        status: 500,
        statusText: 'Internal Server Error',
        data: { message: 'The database server is currently offline.' },
      };
      throw error;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const DashboardService = {
  /**
   * Fetches the products list from FakeStore API
   */
  async getProducts() {
    const response = await apiClient.get('https://fakestoreapi.com/products');
    return response.data;
  },

  /**
   * Fetches the users list from JSONPlaceholder API
   */
  async getUsers() {
    const response = await apiClient.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
  }
};
