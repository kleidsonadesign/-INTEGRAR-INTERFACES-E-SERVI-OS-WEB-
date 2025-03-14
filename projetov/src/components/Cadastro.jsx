import { useState } from 'react';
import PropTypes from 'prop-types';
import './CL.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3) {
      setError('O nome deve ter pelo menos 3 caracteres.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError('Email inválido.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Erro ao cadastrar usuário.');
        return;
      }

      setError('');
      onRegister();
      
      navigate('/login');
    } catch (error) {
      setError('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className='container'>
      <Header /> {}
      <h2 className='hCL'>Cadastro Funcionário</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className='fCL' onSubmit={handleSubmit}>
        <div>
          <label className='lCL'>Digite seu nome:</label>
          <input
            className='iCL'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='lCL'>Digite seu email:</label>
          <input
            className='iCL'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Digite uma senha:</label>
          <input
            className='iCL'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='bCL' type="submit">Cadastrar</button>
      </form>

      <p className="lCL">
        Já tem uma conta?{' '}
        <button className="bCL2" onClick={() => navigate('/login')}>
          Voltar ao login
        </button>
      </p>
    </div>
  );
};

Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default Register;
