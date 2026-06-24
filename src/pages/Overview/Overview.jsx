import { useDashboard } from '../../context/DashboardContext';
import StatCard from '../../components/StatCard/StatCard';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ChartPlaceholder from '../../components/ChartPlaceholder/ChartPlaceholder';
import { Users, ShoppingBag, IndianRupee, Truck, MapPin, Zap, Award } from 'lucide-react';
import './Overview.css';

export const Overview = () => {
  const { loading, error, refreshData } = useDashboard();

  // Loading State
  if (loading) {
    return <Loader message="Loading dashboard data..." />;
  }

  // Error State
  if (error) {
    return <ErrorMessage message={error} onRetry={refreshData} />;
  }

  return (
    <div className="page-container animate-fade-in">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">🇮🇳 Welcome to Bharat Business Dashboard</h2>
          <p className="hero-subtitle">
            Track business performance across Indian states, monitor customers, products, and revenue in real time.
          </p>
        </div>
        <div className="hero-badge">
          <span className="live-pulse"></span> Live Analytics
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="kpi-grid">
        <StatCard
          title="Total Customers"
          value="24,580"
          icon={Users}
          change="12.3%"
          isPositive={true}
          subtitle="Active retail shoppers"
        />
        <StatCard
          title="Active Sellers"
          value="1,250"
          icon={ShoppingBag}
          change="8.1%"
          isPositive={true}
          subtitle="Verified Indian merchants"
        />
        <StatCard
          title="Monthly Revenue"
          value="₹18,45,000"
          icon={IndianRupee}
          change="15.4%"
          isPositive={true}
          subtitle="Net sales value"
        />
        <StatCard
          title="Orders Delivered"
          value="12,340"
          icon={Truck}
          change="4.2%"
          isPositive={true}
          subtitle="Successful shipping completions"
        />
      </div>

      {/* Analytics Charts Section */}
      <div className="charts-section-grid">
        <ChartPlaceholder title="📊 Sales Distribution Across India" type="sales" />
        <ChartPlaceholder title="📈 User Growth Across India" type="growth" />
        <ChartPlaceholder title="🏙 Top Performing Cities" type="cities" />
      </div>

      {/* Additional Indian Business Insights Section */}
      <div className="insights-section">
        <h3 className="insights-section-title">📍 Indian Business Insights</h3>
        <div className="insights-grid">
          <div className="insight-card saffron-top">
            <div className="insight-icon-wrapper saffron-bg">
              <MapPin size={24} />
            </div>
            <div className="insight-details">
              <span className="insight-label">Top State</span>
              <span className="insight-value">Maharashtra</span>
              <span className="insight-desc">Leading in electronics and apparel sales.</span>
            </div>
          </div>

          <div className="insight-card navy-top">
            <div className="insight-icon-wrapper navy-bg">
              <Zap size={24} />
            </div>
            <div className="insight-details">
              <span className="insight-label">Fastest Growing City</span>
              <span className="insight-value">Bangalore</span>
              <span className="insight-desc">35% growth in direct-to-consumer seller listings.</span>
            </div>
          </div>

          <div className="insight-card green-top">
            <div className="insight-icon-wrapper green-bg">
              <Award size={24} />
            </div>
            <div className="insight-details">
              <span className="insight-label">Highest Sales Festival</span>
              <span className="insight-value">Diwali Sale</span>
              <span className="insight-desc">Peak festive shopping contributing 40% of annual revenue.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
