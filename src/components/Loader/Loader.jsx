import './Loader.css';

export const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="loader-container">
      <div className="loader-spinner">
        <div className="spinner-inner"></div>
      </div>
      <p className="loader-text">{message}</p>
    </div>
  );
};

export default Loader;
