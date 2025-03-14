import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Cadastro';
import Circuito from './components/Circuito';
import Estoque from './components/Estoque'; 
import ListarProdutos from './components/ListarProdutos';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleRegister = () => {
    setIsLogin(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Circuito onLogout={handleLogout} /> : <Estoque />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/cadastro" element={<Register onRegister={handleRegister} />} />
          <Route path="/circuito" element={<Circuito />} />
          <Route path="/listar" element={<ListarProdutos />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
