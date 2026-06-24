import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import './DashboardLayout.css';

export const DashboardLayout = () => {
  const { sidebarCollapsed } = useDashboard();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className={`dashboard-layout-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Left Sidebar */}
      <Sidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />
      
      {/* Right Content Column */}
      <div className="main-content-wrapper">
        <Header setMobileOpen={setMobileSidebarOpen} />
        <main className="page-content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
