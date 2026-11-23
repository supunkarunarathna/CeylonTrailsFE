import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section container" style={{ maxWidth: 440 }}>
      <div className="card" style={{ padding: 36 }}>
        <h1 style={{ fontSize: 26, textAlign: 'center' }}>Create your account</h1>
        <p className="text-muted" style={{ textAlign: 'center', marginBottom: 28 }}>Save your custom itineraries and revisit them anytime.</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone (optional)</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" minLength={6} required value={form.password} onChange={handleChange} />
            <span className="form-hint">At least 6 characters.</span>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>
        <p className="text-muted" style={{ textAlign: 'center', marginTop: 20, fontSize: 14 }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-accent-dark)', fontWeight: 600 }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
