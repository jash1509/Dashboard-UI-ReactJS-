import { AlertCircle, RefreshCw } from 'lucide-react';
import './ErrorMessage.css';

export const ErrorMessage = ({ message = 'Failed to load data. Please try again.', onRetry }) => {
  return (
    <div className="error-card animate-fade-in">
      <div className="error-card-icon-wrapper">
        <AlertCircle size={28} />
      </div>
      <h3 className="error-card-title">Data Connection Interrupted</h3>
      <p className="error-card-message">{message}</p>
      {onRetry && (
        <button className="error-card-retry-btn" onClick={onRetry}>
          <RefreshCw size={16} className="retry-icon" />
          Retry Sync
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
