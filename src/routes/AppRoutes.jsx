import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Overview from '../pages/Overview/Overview';
import Products from '../pages/Products/Products';
import Users from '../pages/Users/Users';
import Analytics from '../pages/Analytics/Analytics';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect to overview */}
      <Route path="/" element={<Navigate to="/dashboard/overview" replace />} />
      <Route path="/dashboard" element={<Navigate to="/dashboard/overview" replace />} />

      {/* Dashboard Nesting */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="overview" element={<Overview />} />
        <Route path="products" element={<Products />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/dashboard/overview" replace />} />
    </Routes>
  );
};

export default AppRoutes;
