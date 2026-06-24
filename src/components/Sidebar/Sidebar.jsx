import { NavLink } from 'react-router-dom';
import { useDashboard } from '../../context/DashboardContext';
import { 
  Home, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck
} from 'lucide-react';
import './Sidebar.css';

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { sidebarCollapsed, setSidebarCollapsed } = useDashboard();

  const menuItems = [
    {
      path: '/dashboard/overview',
      name: 'Overview',
      emoji: '🏠',
      icon: Home,
    },
    {
      path: '/dashboard/products',
      name: 'Products',
      emoji: '🛍',
      icon: ShoppingBag,
    },
    {
      path: '/dashboard/users',
      name: 'Users',
      emoji: '👥',
      icon: Users,
    },
    {
      path: '/dashboard/analytics',
      name: 'Analytics',
      emoji: '📈',
      icon: TrendingUp,
    },
  ];

  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const closeMobileSidebar = () => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <div 
        className={`sidebar-backdrop ${mobileOpen ? 'visible' : ''}`} 
        onClick={closeMobileSidebar}
      />

      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-logo-container">
            <ShieldCheck size={20} className="brand-shield" />
          </div>
          <span className="brand-name">Bharat Business</span>
        </div>

        {/* Navigation Items */}
        <ul className="sidebar-menu">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.path} className="sidebar-item">
                <NavLink
                  to={item.path}
                  onClick={closeMobileSidebar}
                  className={({ isActive }) => 
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                >
                  <IconComponent className="sidebar-link-icon" size={18} />
                  <span className="sidebar-link-text">
                    <span className="link-emoji">{item.emoji}</span> {item.name}
                  </span>
                </NavLink>
                {sidebarCollapsed && (
                  <span className="sidebar-tooltip">{item.emoji} {item.name}</span>
                )}
              </li>
            );
          })}
        </ul>

        {/* Collapse Control Footer */}
        <div className="sidebar-footer">
          <button 
            className="collapse-btn" 
            onClick={handleToggleCollapse}
            aria-label="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
