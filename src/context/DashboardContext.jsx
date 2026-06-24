/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { DashboardService } from '../services/api';
import { dashboardReducer, initialState, FETCH_START, FETCH_SUCCESS, FETCH_ERROR } from './dashboardReducer';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Theme state (check localStorage first)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('bharat-theme');
    return savedTheme || 'light'; // Light is default for Bharat theme
  });

  // Simulator states
  const [simulateSlow, setSimulateSlowState] = useState(false);
  const [simulateError, setSimulateErrorState] = useState(false);

  // Global UI states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize window configuration for Axios interceptors
  useEffect(() => {
    window.__dashboardConfig = {
      simulateSlow,
      simulateError,
    };
  }, [simulateSlow, simulateError]);

  // Synchronize CSS class for Theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('bharat-theme', theme);
  }, [theme]);

  // Toggle Theme helper
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setSimulateSlow = (val) => {
    setSimulateSlowState(val);
  };

  const setSimulateError = (val) => {
    setSimulateErrorState(val);
  };

  // Fetch all dashboard data
  const refreshData = async () => {
    dispatch({ type: FETCH_START });
    try {
      // Fetch products and users in parallel
      const [fetchedProducts, fetchedUsers] = await Promise.all([
        DashboardService.getProducts(),
        DashboardService.getUsers(),
      ]);

      dispatch({
        type: FETCH_SUCCESS,
        payload: {
          products: fetchedProducts,
          users: fetchedUsers,
        },
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      dispatch({
        type: FETCH_ERROR,
        payload: err.response?.data?.message || err.message || 'Failed to load dashboard resources.',
      });
    }
  };

  // Initial load
  useEffect(() => {
    refreshData();
  }, []);

  const value = {
    theme,
    toggleTheme,
    simulateSlow,
    setSimulateSlow,
    simulateError,
    setSimulateError,
    sidebarCollapsed,
    setSidebarCollapsed,
    searchQuery,
    setSearchQuery,
    products: state.products,
    users: state.users,
    loading: state.loading,
    error: state.error,
    refreshData,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
