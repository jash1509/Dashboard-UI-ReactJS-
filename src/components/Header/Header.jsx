import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDashboard } from '../../context/DashboardContext';
import { 
  Sun, 
  Moon, 
  Search, 
  Sliders, 
  Menu, 
  X,
  RefreshCw,
  Bell
} from 'lucide-react';
import './Header.css';

export const Header = ({ setMobileOpen }) => {
  const location = useLocation();
  const { 
    theme, 
    toggleTheme, 
    simulateSlow, 
    setSimulateSlow, 
    simulateError, 
    setSimulateError,
    searchQuery,
    setSearchQuery,
    refreshData,
    loading
  } = useDashboard();

  const [showSimulator, setShowSimulator] = useState(false);
  const simulatorRef = useRef(null);

  // Close simulator panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (simulatorRef.current && !simulatorRef.current.contains(event.target)) {
        setShowSimulator(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSimulatorActive = simulateSlow || simulateError;

  return (
    <header className="header animate-fade-in">
      {/* Left: Mobile Toggle & Branding */}
      <div className="header-left">
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label="Open Sidebar Menu"
        >
          <Menu size={22} />
        </button>
        <div className="header-brand-title">
          <span className="brand-flag">🇮🇳</span>
          <h1 className="brand-header-title">Bharat Business Dashboard</h1>
        </div>
      </div>

      {/* Right: Search, Actions, Notifications & Greeting */}
      <div className="header-right">
        {/* Search Bar (filters local tables/cards for products/users) */}
        {(location.pathname === '/dashboard/products' || location.pathname === '/dashboard/users') && (
          <div className="search-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder={`Search ${location.pathname.split('/').pop()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="search-icon" size={16} />
          </div>
        )}

        <div className="header-actions">
          {/* Refresh Data button */}
          <button 
            className="action-btn"
            onClick={refreshData}
            title="Refresh API Data"
            disabled={loading}
            aria-label="Refresh Data"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>

          {/* Theme Toggle */}
          <button 
            className="action-btn" 
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Simulator drawer toggle */}
          <div className="simulator-wrapper" ref={simulatorRef}>
            <button 
              className="action-btn" 
              onClick={() => setShowSimulator(!showSimulator)}
              title="API Sandbox Simulator"
              aria-label="Open simulation settings"
            >
              <Sliders size={18} />
              {isSimulatorActive && <span className="badge-dot" />}
            </button>

            {showSimulator && (
              <div className="simulator-panel">
                <div className="simulator-header">
                  <span>API Sandbox Simulator</span>
                  <X 
                    size={16} 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => setShowSimulator(false)} 
                  />
                </div>
                
                <label className="simulator-option">
                  <input 
                    type="checkbox" 
                    className="simulator-checkbox"
                    checked={simulateSlow}
                    onChange={(e) => setSimulateSlow(e.target.checked)}
                  />
                  <div className="simulator-text-container">
                    <span className="simulator-label">Simulate High Latency</span>
                    <span className="simulator-desc">Adds a 2000ms delay to Axios requests to show loading state.</span>
                  </div>
                </label>

                <label className="simulator-option">
                  <input 
                    type="checkbox" 
                    className="simulator-checkbox"
                    checked={simulateError}
                    onChange={(e) => setSimulateError(e.target.checked)}
                  />
                  <div className="simulator-text-container">
                    <span className="simulator-label">Simulate Server Error</span>
                    <span className="simulator-desc">Forces Axios requests to throw a 500 server error code.</span>
                  </div>
                </label>

                {isSimulatorActive && (
                  <div className="simulation-active-banner">
                    ⚠️ API constraints are active
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Notification Icon */}
          <button className="action-btn notification-btn" title="Notifications" aria-label="Notifications">
            <Bell size={18} />
            <span className="notification-badge" />
          </button>
        </div>

        {/* User Greeting & Avatar */}
        <div className="user-profile">
          <div className="user-greeting-box">
            <span className="user-greeting">Namaste, Admin 👋</span>
            <span className="user-role-label">System Administrator</span>
          </div>
          <div className="user-avatar-circle-header" title="Admin Avatar">AD</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
