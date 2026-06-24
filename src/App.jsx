import { BrowserRouter } from 'react-router-dom';
import { DashboardProvider } from './context/DashboardContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

export function App() {
  return (
    <DashboardProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </DashboardProvider>
  );
}

export default App;
