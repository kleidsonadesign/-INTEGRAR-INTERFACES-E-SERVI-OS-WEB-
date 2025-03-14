import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <p>Gerenciador de Estoque</p>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/">Estoque</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
