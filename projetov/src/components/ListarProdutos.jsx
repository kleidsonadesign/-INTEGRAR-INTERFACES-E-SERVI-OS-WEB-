import React, { useEffect, useState } from 'react';
import Header from './Header';
import './ListarProdutos.css';

const ListarProdutos = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://localhost:3000/produtos');
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div className="lista-produtos-container">
      <Header /> {}

      <main className="main-content">
        <h2>Lista de Produtos</h2>
        {produtos.length === 0 ? (
          <p>Não há itens no estoque</p>
        ) : (
          <ul className="produto-list">
            {produtos.map((produto) => (
              <li key={produto._id} className="produto-item">
                <span>{produto.nome}</span>
                {produto.preco && <span> - Preço: R${produto.preco.toFixed(2)}</span>}
                {produto.promocao > 0 && <span> - Promoção: {produto.promocao}%</span>}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default ListarProdutos;
