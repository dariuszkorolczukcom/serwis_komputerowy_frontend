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
  const [isStaff, setIsStaff] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);
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
        <Route index element={<HomePage user={user} isStaff={isStaff} isSuperuser={isSuperuser} />} />
        <Route path="add-ticket" element={<ReportIssuePage user={user} />} />
        <Route 
          path="login" 
          element={
            user ? <Navigate to="/" replace /> 
            : 
            <LoginPage 
              setUser={setUser} 
              setIsStaff={setIsStaff} 
              setIsSuperuser={setIsSuperuser} 
            />
          } 
        />
        <Route 
          path="register" 
          element={
            user ? <Navigate to="/" replace /> : <RegisterPage />
          } 
        />
        <Route path="tickets" element={<TicketListPage user={user} isStaff={isStaff} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/activate/:uid/:token" element={<ActivateUserPage />} />
      </Route>
    </Routes>
  );
}

export default App;
