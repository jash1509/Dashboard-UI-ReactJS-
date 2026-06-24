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

// Deterministic mock Indian profiles mapped to user IDs
const indianUsers = [
  {
    name: 'Aarav Sharma',
    username: 'aarav_sharma',
    email: 'aarav.sharma@tcs.in',
    phone: '+91 98100 12345',
    company: { name: 'Tata Consultancy Services', catchPhrase: 'Building on belief' }
  },
  {
    name: 'Vihaan Patel',
    username: 'vihaan_patel',
    email: 'vihaan.patel@reliance.co.in',
    phone: '+91 98200 23456',
    company: { name: 'Reliance Industries', catchPhrase: 'Growth is Life' }
  },
  {
    name: 'Aditya Iyer',
    username: 'aditya_iyer',
    email: 'aditya.iyer@infosys.com',
    phone: '+91 98300 34567',
    company: { name: 'Infosys Limited', catchPhrase: 'Navigate your next' }
  },
  {
    name: 'Ananya Rao',
    username: 'ananya_rao',
    email: 'ananya.rao@wipro.com',
    phone: '+91 98400 45678',
    company: { name: 'Wipro Technologies', catchPhrase: 'Applying Thought' }
  },
  {
    name: 'Diya Sen',
    username: 'diya_sen',
    email: 'diya.sen@hdfcbank.com',
    phone: '+91 98500 56789',
    company: { name: 'HDFC Bank', catchPhrase: 'We understand your world' }
  },
  {
    name: 'Ishaan Mukherjee',
    username: 'ishaan_mukherjee',
    email: 'ishaan.m@icicibank.com',
    phone: '+91 98600 67890',
    company: { name: 'ICICI Bank', catchPhrase: 'Hum hain na, khayal aapka' }
  },
  {
    name: 'Kabir Joshi',
    username: 'kabir_joshi',
    email: 'kabir.joshi@tatamotors.com',
    phone: '+91 98700 78901',
    company: { name: 'Tata Motors', catchPhrase: 'Connecting aspirations' }
  },
  {
    name: 'Meera Nair',
    username: 'meera_nair',
    email: 'meera.nair@mahindra.com',
    phone: '+91 98800 89012',
    company: { name: 'Mahindra & Mahindra', catchPhrase: 'Rise' }
  },
  {
    name: 'Neha Gupta',
    username: 'neha_gupta',
    email: 'neha.gupta@airtel.in',
    phone: '+91 98900 90123',
    company: { name: 'Bharti Airtel', catchPhrase: 'Express Yourself' }
  },
  {
    name: 'Rohan Verma',
    username: 'rohan_verma',
    email: 'rohan.verma@ltindia.com',
    phone: '+91 99100 01234',
    company: { name: 'Larsen & Toubro', catchPhrase: 'We make things that make India proud' }
  }
];

export const DashboardService = {
  /**
   * Fetches the products list from FakeStore API
   */
  async getProducts() {
    const response = await apiClient.get('https://fakestoreapi.com/products');
    return response.data;
  },

  /**
   * Fetches the users list from JSONPlaceholder API and maps them to Indian profiles
   */
  async getUsers() {
    const response = await apiClient.get('https://jsonplaceholder.typicode.com/users');
    return response.data.map((user, index) => {
      const indian = indianUsers[index % indianUsers.length];
      return {
        ...user,
        name: indian.name,
        username: indian.username,
        email: indian.email,
        phone: indian.phone,
        company: {
          ...user.company,
          name: indian.company.name,
          catchPhrase: indian.company.catchPhrase
        }
      };
    });
  }
};
