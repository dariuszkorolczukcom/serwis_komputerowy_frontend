import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ReportIssuePage from './pages/ReportIssuePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserIssuesPage from './pages/UserIssuesPage';

interface User {
  name?: string;
  email: string;
  password?: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (email: string) => {
    const loggedUser: User = { email };
    localStorage.setItem('user', JSON.stringify(loggedUser));
    setUser(loggedUser);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    const newUser: User = { name, email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Routes>
      <Route element={<Layout user={user} onLogout={handleLogout} />}>
        <Route index element={<HomePage user={user} />} />
        <Route path="report-issue" element={<ReportIssuePage user={user} />} />
        <Route 
          path="login" 
          element={
            user ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route 
          path="register" 
          element={
            user ? <Navigate to="/" replace /> : <RegisterPage onRegister={handleRegister} />
          } 
        />
        <Route path="my-issues" element={<UserIssuesPage user={user} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
