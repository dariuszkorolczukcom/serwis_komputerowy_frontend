import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import User from './types/user';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ReportIssuePage from './pages/ReportIssuePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TicketListPage from './pages/TicketListPage';
import ActivateUserPage from './pages/ActivateUserPage';


function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/'); 
  };

  return (
    <Routes>
      <Route element={<Layout user={user} onLogout={handleLogout} />}>
        <Route index element={<HomePage user={user} />} />
        <Route path="add-ticket" element={<ReportIssuePage user={user} />} />
        <Route 
          path="login" 
          element={
            user ? <Navigate to="/" replace /> : <LoginPage setUser={setUser} />
          } 
        />
        <Route 
          path="register" 
          element={
            user ? <Navigate to="/" replace /> : <RegisterPage />
          } 
        />
        <Route path="tickets" element={<TicketListPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/activate/:token/:uid" element={<ActivateUserPage />} />
      </Route>
    </Routes>
  );
}

export default App;
