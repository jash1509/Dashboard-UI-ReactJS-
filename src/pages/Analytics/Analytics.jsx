import ChartPlaceholder from '../../components/ChartPlaceholder/ChartPlaceholder';
import StatCard from '../../components/StatCard/StatCard';
import { Landmark, TrendingUp, IndianRupee, ShoppingBag } from 'lucide-react';
import './Analytics.css';

export const Analytics = () => {
  return (
    <div className="page-container animate-fade-in">
      {/* Hero Section */}
      <div className="analytics-hero">
        <h2 className="analytics-hero-title">📈 Indian Market Business Intelligence</h2>
        <p className="analytics-hero-subtitle">
          Consolidated performance metrics, state-level penetration, city listings, and seasonal growth channels.
        </p>
      </div>

      {/* Quick metrics */}
      <div className="kpi-grid">
        <StatCard
          title="Digital India Penetration"
          value="74.2%"
          icon={Landmark}
          change="5.4%"
          isPositive={true}
          subtitle="Year-over-year increase"
        />
        <StatCard
          title="Avg Transaction Value"
          value="₹1,492"
          icon={IndianRupee}
          change="8.2%"
          isPositive={true}
          subtitle="Since last quarter"
        />
        <StatCard
          title="Mobile Commerce Share"
          value="89.1%"
          icon={TrendingUp}
          change="12.0%"
          isPositive={true}
          subtitle="Of total traffic"
        />
        <StatCard
          title="Avg Delivery Turnaround"
          value="2.8 Days"
          icon={ShoppingBag}
          change="0.5 Days"
          isPositive={true}
          subtitle="Improved transit time"
        />
      </div>

      {/* Main Charts Placeholders */}
      <div className="analytics-charts-layout">
        <div className="analytics-left-col">
          <ChartPlaceholder title="📊 Sales Distribution Across India" type="sales" />
          <ChartPlaceholder title="📈 User Growth Across India" type="growth" />
        </div>
        <div className="analytics-right-col">
          <ChartPlaceholder title="🏙 Top Performing Cities" type="cities" />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
