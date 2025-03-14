import { useState } from 'react';
import PropTypes from 'prop-types';
import './CL.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRecovering, setIsRecovering] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRecovering) {
      try {
        const response = await fetch('http://localhost:3000/api/auth/recover-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, newPassword }),
        });

        if (!response.ok) {
          const data = await response.json();
          setError(data.message || 'Erro ao recuperar a senha.');
          return;
        }

        setError('');
        alert('Senha alterada com sucesso. Você pode fazer login com a nova senha.');
        setIsRecovering(false);
      } catch (error) {
        setError('Erro ao conectar com o servidor.');
      }
    } else {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const data = await response.json();
          setError(data.message || 'Erro ao fazer login.');
          return;
        }

        const { token } = await response.json();
        localStorage.setItem('token', token);
        setError('');
        setLoginSuccess(true);

        setTimeout(() => {
          navigate('/circuito');
        }, 2000);

        onLogin();
      } catch (error) {
        setError('Erro ao conectar com o servidor.');
      }
    }
  };

  const toggleRecoverMode = () => {
    setIsRecovering(!isRecovering);
    setError('');
  };

  const handleCadastroRedirect = () => {
    navigate('/cadastro');
  };

  return (
    <div className="container">
      <Header /> {}
      <h2 className="hCL">{isRecovering ? 'Recuperar Senha' : 'Login Funcionário'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {}
      {loginSuccess && (
        <span style={{ color: 'green', fontSize: '16px', marginBottom: '10px' }}>
          Login realizado com sucesso! Redirecionando...
        </span>
      )}

      <form className="fCL" onSubmit={handleSubmit}>
        <div>
          <label className="lCL">Digite seu email:</label>
          <input
            className="iCL"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {!isRecovering && (
          <div>
            <label className="lCL">Digite sua senha:</label>
            <input
              className="iCL"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}
        {isRecovering && (
          <div>
            <label className="lCL">Digite uma nova senha:</label>
            <input
              className="iCL"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button className="bCL" type="submit">
          {isRecovering ? 'Alterar Senha' : 'Login'}
        </button>
      </form>

      {!isRecovering && (
        <p className="lCL">
          Esqueceu a senha?{' '}
          <button className="bCL2" onClick={toggleRecoverMode}>
            Recuperar senha
          </button>
        </p>
      )}

      {isRecovering && (
        <p className="lCL">
          Já tem uma conta?{' '}
          <button className="bCL2" onClick={toggleRecoverMode}>
            Voltar ao login
          </button>
        </p>
      )}
      {}
        <p className="lCL">
          Não tem uma conta?{' '}
          <button className="bCL2" onClick={handleCadastroRedirect}>
            Cadastre-se
          </button>
        </p>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
