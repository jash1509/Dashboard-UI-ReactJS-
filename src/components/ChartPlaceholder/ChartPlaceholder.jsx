import { BarChart3, TrendingUp, Landmark } from 'lucide-react';
import './ChartPlaceholder.css';

export const ChartPlaceholder = ({ title, type }) => {
  // Render based on the chart type
  const renderChart = () => {
    switch (type) {
      case 'sales':
        return (
          <div className="chart-wrapper">
            <svg viewBox="0 0 400 200" className="placeholder-svg">
              <defs>
                <linearGradient id="saffronGradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#FF9933" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#FF9933" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#138808" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#138808" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="40" y1="20" x2="380" y2="20" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4" />
              <line x1="40" y1="70" x2="380" y2="70" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4" />
              <line x1="40" y1="120" x2="380" y2="120" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4" />
              <line x1="40" y1="170" x2="380" y2="170" stroke="#9CA3AF" strokeWidth="1.5" />

              {/* Saffron and Green Bars representing states */}
              {/* West - Maharashtra */}
              <rect x="70" y="50" width="30" height="120" rx="4" fill="url(#saffronGradient)" />
              <text x="85" y="185" textAnchor="middle" className="x-axis-lbl">MH</text>
              <text x="85" y="45" textAnchor="middle" className="bar-lbl">35%</text>

              {/* South - Karnataka */}
              <rect x="130" y="80" width="30" height="90" rx="4" fill="url(#greenGradient)" />
              <text x="145" y="185" textAnchor="middle" className="x-axis-lbl">KA</text>
              <text x="145" y="75" textAnchor="middle" className="bar-lbl">25%</text>

              {/* North - Delhi */}
              <rect x="190" y="70" width="30" height="100" rx="4" fill="url(#saffronGradient)" />
              <text x="205" y="185" textAnchor="middle" className="x-axis-lbl">DL</text>
              <text x="205" y="65" textAnchor="middle" className="bar-lbl">20%</text>

              {/* East - WB */}
              <rect x="250" y="110" width="30" height="60" rx="4" fill="url(#greenGradient)" />
              <text x="265" y="185" textAnchor="middle" className="x-axis-lbl">WB</text>
              <text x="265" y="105" textAnchor="middle" className="bar-lbl">12%</text>

              {/* Central - MP */}
              <rect x="310" y="130" width="30" height="40" rx="4" fill="url(#saffronGradient)" />
              <text x="325" y="185" textAnchor="middle" className="x-axis-lbl">MP</text>
              <text x="325" y="125" textAnchor="middle" className="bar-lbl">8%</text>
            </svg>
            <div className="chart-legend">
              <span className="legend-dot saffron"></span> North/West (Saffron)
              <span className="legend-dot green"></span> South/East (Green)
            </div>
          </div>
        );
      case 'growth':
        return (
          <div className="chart-wrapper">
            <svg viewBox="0 0 400 200" className="placeholder-svg">
              <defs>
                <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#000080" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#000080" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="40" y1="30" x2="380" y2="30" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="40" y1="80" x2="380" y2="80" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="40" y1="130" x2="380" y2="130" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="40" y1="170" x2="380" y2="170" stroke="#9CA3AF" strokeWidth="1.5" />

              {/* Trend path */}
              <path d="M 50 150 Q 110 130 150 90 T 250 80 T 350 40" fill="none" stroke="#000080" strokeWidth="3" />
              <path d="M 50 150 Q 110 130 150 90 T 250 80 T 350 40 L 350 170 L 50 170 Z" fill="url(#lineAreaGrad)" />

              {/* Dots on line */}
              <circle cx="50" cy="150" r="4" fill="#000080" />
              <circle cx="150" cy="90" r="4" fill="#000080" />
              <circle cx="250" cy="80" r="4" fill="#000080" />
              <circle cx="350" cy="40" r="4" fill="#000080" />

              {/* Labels */}
              <text x="50" y="190" textAnchor="middle" className="x-axis-lbl">Q1</text>
              <text x="150" y="190" textAnchor="middle" className="x-axis-lbl">Q2</text>
              <text x="250" y="190" textAnchor="middle" className="x-axis-lbl">Q3</text>
              <text x="350" y="190" textAnchor="middle" className="x-axis-lbl">Q4</text>
            </svg>
            <div className="chart-legend">
              <span className="legend-indicator navy"></span> Real-time active buyer registrations
            </div>
          </div>
        );
      case 'cities': {
        const cities = [
          { name: 'Mumbai', value: 88, code: 'MH', amount: '₹5,40,000' },
          { name: 'Delhi', value: 76, code: 'DL', amount: '₹4,10,000' },
          { name: 'Bangalore', value: 72, code: 'KA', amount: '₹3,90,000' },
          { name: 'Hyderabad', value: 60, code: 'TG', amount: '₹3,20,000' },
          { name: 'Pune', value: 55, code: 'MH', amount: '₹2,95,000' }
        ];
        return (
          <div className="cities-list-wrapper">
            {cities.map((city, idx) => (
              <div key={city.name} className="city-item">
                <div className="city-info">
                  <span className="city-rank">#{idx + 1}</span>
                  <span className="city-name">{city.name} <span className="city-code">({city.code})</span></span>
                  <span className="city-amount">{city.amount}</span>
                </div>
                <div className="city-progress-bar-bg">
                  <div 
                    className="city-progress-bar-fill" 
                    style={{ 
                      width: `${city.value}%`,
                      backgroundColor: idx % 2 === 0 ? '#FF9933' : '#138808'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        );
      }
      default:
        return (
          <div className="generic-placeholder">
            <BarChart3 size={40} className="placeholder-icon" />
            <p>Data visualization is currently syncing...</p>
          </div>
        );
    }
  };

  const getIcon = () => {
    if (type === 'sales') return <BarChart3 size={18} className="placeholder-header-icon saffron-txt" />;
    if (type === 'growth') return <TrendingUp size={18} className="placeholder-header-icon navy-txt" />;
    return <Landmark size={18} className="placeholder-header-icon green-txt" />;
  };

  return (
    <div className="chart-placeholder-card animate-fade-in">
      <div className="placeholder-card-header">
        {getIcon()}
        <h4 className="placeholder-card-title">{title}</h4>
      </div>
      <div className="placeholder-card-body">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartPlaceholder;
