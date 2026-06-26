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
  Bell,
  ShoppingBag,
  AlertTriangle,
  UserPlus,
  Check,
  Trash2,
  BellOff,
  Info,
  CheckSquare
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
  const [showNotifications, setShowNotifications] = useState(false);
  const simulatorRef = useRef(null);
  const notificationsRef = useRef(null);

  // Load default notifications or read from localStorage
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('bharat-notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse notifications from localStorage', e);
      }
    }
    return [
      {
        id: 1,
        title: "New Order Received 📦",
        message: "Order #1294 by Rajesh Kumar worth ₹12,500",
        type: "order",
        time: "5 mins ago",
        isRead: false,
      },
      {
        id: 2,
        title: "Low Stock Alert ⚠️",
        message: "Product 'Darjeeling Tea' stock is under 15 units",
        type: "alert",
        time: "1 hour ago",
        isRead: false,
      },
      {
        id: 3,
        title: "New Vendor Onboarded 🤝",
        message: "Nisha Patel from Mumbai added as supplier",
        type: "user",
        time: "3 hours ago",
        isRead: false,
      },
      {
        id: 4,
        title: "Payout Successful ✅",
        message: "Vendor payout of ₹45,000 processed successfully",
        type: "success",
        time: "Yesterday",
        isRead: true,
      }
    ];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('bharat-notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Combine static notifications with transient simulation constraints
  const activeNotifications = [...notifications];

  if (simulateSlow) {
    activeNotifications.unshift({
      id: 'sim-slow',
      title: "Latency Sandbox Active ⚡",
      message: "Axios requests will experience a 2000ms delay",
      type: "danger",
      time: "Active Now",
      isRead: false,
      isSim: true
    });
  }

  if (simulateError) {
    activeNotifications.unshift({
      id: 'sim-error',
      title: "Error Sandbox Active ⚠️",
      message: "Requests will fail with HTTP 500 status code",
      type: "danger",
      time: "Active Now",
      isRead: false,
      isSim: true
    });
  }

  const unreadCount = activeNotifications.filter(n => !n.isRead).length;

  // Close panels when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (simulatorRef.current && !simulatorRef.current.contains(event.target)) {
        setShowSimulator(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSimulatorActive = simulateSlow || simulateError;

  const markAsRead = (id) => {
    if (id === 'sim-slow') {
      setSimulateSlow(false);
      return;
    }
    if (id === 'sim-error') {
      setSimulateError(false);
      return;
    }
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    if (simulateSlow) setSimulateSlow(false);
    if (simulateError) setSimulateError(false);
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearAll = () => {
    if (simulateSlow) setSimulateSlow(false);
    if (simulateError) setSimulateError(false);
    setNotifications([]);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return <ShoppingBag size={15} />;
      case 'alert':
        return <AlertTriangle size={15} />;
      case 'user':
        return <UserPlus size={15} />;
      case 'danger':
        return <AlertTriangle size={15} />;
      default:
        return <Info size={15} />;
    }
  };

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
              onClick={() => {
                setShowSimulator(!showSimulator);
                setShowNotifications(false);
              }}
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

          {/* Notification Icon & Dropdown */}
          <div className="notifications-wrapper" ref={notificationsRef}>
            <button 
              className={`action-btn notification-btn ${showNotifications ? 'active' : ''}`}
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowSimulator(false);
              }}
              title="Notifications" 
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="notification-badge">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="notifications-dropdown-panel">
                <div className="notifications-header">
                  <div className="notifications-title-row">
                    <h3>Notifications</h3>
                    {unreadCount > 0 && <span className="unread-badge-title">{unreadCount} New</span>}
                  </div>
                  <div className="notifications-actions">
                    {unreadCount > 0 && (
                      <button 
                        className="notifications-action-link" 
                        onClick={markAllAsRead}
                        title="Mark all as read"
                      >
                        <CheckSquare size={13} style={{ marginRight: '4px' }} />
                        Read All
                      </button>
                    )}
                    {activeNotifications.length > 0 && (
                      <button 
                        className="notifications-action-link danger" 
                        onClick={clearAll}
                        title="Clear all notifications"
                      >
                        <Trash2 size={13} style={{ marginRight: '4px' }} />
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="notifications-list-container">
                  {activeNotifications.length > 0 ? (
                    activeNotifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`notification-item ${notif.isRead ? 'read' : 'unread'} ${notif.isSim ? 'simulation-notif' : ''}`}
                        onClick={() => markAsRead(notif.id)}
                      >
                        <div className={`notification-icon-wrapper ${notif.type}`}>
                          {getNotificationIcon(notif.type)}
                        </div>
                        <div className="notification-content">
                          <div className="notification-title-container">
                            <span className="notification-item-title">{notif.title}</span>
                            {!notif.isRead && <span className="unread-pulse-dot" />}
                          </div>
                          <p className="notification-message">{notif.message}</p>
                          <div className="notification-footer">
                            <span className="notification-time">{notif.time}</span>
                            {!notif.isRead && (
                              <button 
                                className="mark-read-btn" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notif.id);
                                }}
                                title="Mark as read"
                              >
                                <Check size={12} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="notifications-empty-state">
                      <BellOff size={32} className="empty-bell-icon" />
                      <p className="empty-title">All Caught Up!</p>
                      <p className="empty-desc">You don't have any notifications right now.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
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
