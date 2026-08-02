import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) { alert('Registration Failed'); }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', background: '#fff', borderRadius: '8px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{width:'100%',padding:'10px',margin:'10px 0'}} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{width:'100%',padding:'10px',margin:'10px 0'}} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{width:'100%',padding:'10px',margin:'10px 0'}} />
        <button type="submit" style={{width:'100%',padding:'10px',background:'#28a745',color:'#fff',border:'none'}}>Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};
export default Register;