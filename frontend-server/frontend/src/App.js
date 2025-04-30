import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainWindow from './components/MainWindow';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './components/Dashboard';
import DashboardAdmin from './components/DashboardAdmin';
import BodyContainer from './components/Body';
import CalendarStandAlone from './components/CalendarStandAlone'
import Footer from './components/Footer';
import 'leaflet/dist/leaflet.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';


function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser({ username });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Provider store={store}>
      <Router>
        <Header user={user} onLogout={handleLogout} />
        <BodyContainer>

          <Routes>
            <Route path="/" element={<MainWindow />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<DashboardAdmin />} />
            <Route path="/calendar" element={<CalendarStandAlone />} />
          </Routes>
        </BodyContainer>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
