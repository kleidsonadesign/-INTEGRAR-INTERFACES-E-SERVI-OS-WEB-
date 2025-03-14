import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Estoque.css';

const Estoque = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleListarRedirect = () => {
    navigate('/listar');
  };

  return (
    <div className="estoque-container">
      {}
      <header className="header">
        <div className="header-title">Gerenciador de Estoque</div>
        <div className="header-buttons">
          <button className="header-button" onClick={handleLoginRedirect}>Login</button>
        </div>
      </header>

      {}
      <main className="main-content">
        <h2>Bem-vindo ao Gerenciador de Estoque</h2>
        <p>Gerencie os produtos de seu estoque facilmente com esta ferramenta. Se você está ness página é porque ainda não efetuou o login como funcionário, se deseja apenas olhar o estoque sem a função de editar, clique no botão abaixo.</p>
        <button className="go-to-estoque" onClick={handleListarRedirect}>Visualizar Estoque</button>
      </main>
    </div>
  );
};

export default Estoque;
