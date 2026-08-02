import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) { alert('Login Failed'); }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', background: '#fff', borderRadius: '8px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{width:'100%',padding:'10px',margin:'10px 0'}} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{width:'100%',padding:'10px',margin:'10px 0'}} />
        <button type="submit" style={{width:'100%',padding:'10px',background:'#007bff',color:'#fff',border:'none'}}>Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};
export default Login;