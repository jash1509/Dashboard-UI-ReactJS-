import './StatCard.css';

export const StatCard = ({ title, value, icon: Icon, change, isPositive, subtitle }) => {
  return (
    <div className="stat-card animate-fade-in">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        {Icon && (
          <div className="stat-card-icon-wrapper">
            <Icon size={20} className="stat-card-icon" />
          </div>
        )}
      </div>
      <div className="stat-card-value">{value}</div>
      {(change !== undefined || subtitle) && (
        <div className="stat-card-footer">
          {change !== undefined && (
            <span className={`stat-card-change ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? '↑' : '↓'} {change}
            </span>
          )}
          {subtitle && <span className="stat-card-subtitle">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};

export default StatCard;
