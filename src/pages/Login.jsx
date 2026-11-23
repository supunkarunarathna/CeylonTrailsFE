import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const loggedInUser = await login(form);
      // Admins have no use for the regular dashboard - send them straight to
      // the admin view unless they were redirected here from some other
      // specific page (in which case respect that instead).
      const fallback = loggedInUser?.role === 'admin' ? '/admin/itineraries' : '/dashboard';
      const redirectTo = location.state?.from?.pathname || fallback;
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section container" style={{ maxWidth: 440 }}>
      <div className="card" style={{ padding: 36 }}>
        <h1 style={{ fontSize: 26, textAlign: 'center' }}>Welcome back</h1>
        <p className="text-muted" style={{ textAlign: 'center', marginBottom: 28 }}>Log in to view your saved itineraries.</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required value={form.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>
        <p className="text-muted" style={{ textAlign: 'center', marginTop: 20, fontSize: 14 }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--color-accent-dark)', fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
