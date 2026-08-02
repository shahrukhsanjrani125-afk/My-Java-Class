import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [form, setForm] = useState({ title: '', amount: '', type: 'expense', category: 'Food' });
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    const res = await axios.get(`${API_URL}/transactions`);
    setTransactions(res.data);

    const summaryRes = await axios.get(`${API_URL}/transactions/summary`);
    const expenseData = summaryRes.data.find(d => d._id === 'expense');
    if (expenseData && expenseData.items.length > 0) {
      setChartData({
        labels: expenseData.items.map(i => i.category),
        datasets: [{ 
          label: 'Expenses', 
          data: expenseData.items.map(i => i.total),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
        }]
      });
    } else {
      setChartData({ labels: ['No Data'], datasets: [{ label: 'No Data', data: [1], backgroundColor: ['#ccc'] }] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/transactions`, form);
    setForm({ title: '', amount: '', type: 'expense', category: 'Food' });
    fetchData();
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete?')) {
      await axios.delete(`${API_URL}/transactions/${id}`);
      fetchData();
    }
  };

  const downloadPDF = () => window.open(`${API_URL}/transactions/download-pdf`, '_blank');

  const handleLogout = () => { logout(); navigate('/login'); };

  useEffect(() => { fetchData(); }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>💰 FinTrack</h1>
      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
      <button onClick={downloadPDF} style={{ marginLeft: '10px', float: 'right' }}>📄 Download PDF</button>
      <p>Welcome, {user?.name}</p>
      <hr />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', flex: 1 }}>
          <h3>Add Transaction</h3>
          <form onSubmit={handleSubmit}>
            <input placeholder="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required style={{width:'100%',padding:'8px',margin:'5px 0'}} />
            <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} required style={{width:'100%',padding:'8px',margin:'5px 0'}} />
            <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} style={{width:'48%',padding:'8px',margin:'5px 1%'}}>
              <option value="expense">Expense</option><option value="income">Income</option>
            </select>
            <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} style={{width:'48%',padding:'8px',margin:'5px 1%'}}>
              <option value="Food">Food</option><option value="Rent">Rent</option><option value="Shopping">Shopping</option><option value="Salary">Salary</option>
            </select>
            <button type="submit" style={{width:'100%',padding:'10px',background:'#007bff',color:'#fff',border:'none'}}>Add</button>
          </form>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '300px', height: '300px' }}>
          <h3>Spending Breakdown</h3>
          <Pie data={chartData} />
        </div>
      </div>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h3>History</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {transactions.map(t => (
            <li key={t._id} style={{ borderBottom:'1px solid #eee', padding:'10px 0', display:'flex', justifyContent:'space-between' }}>
              <span>{t.title} - <strong>${t.amount}</strong> ({t.category})</span>
              <button onClick={() => handleDelete(t._id)} style={{background:'red',color:'#fff',border:'none',padding:'5px 10px'}}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Dashboard;