import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="empty-state" style={{ padding: '120px 20px' }}>
      <h1 style={{ fontSize: 60 }}>404</h1>
      <p>We couldn't find the page you're looking for.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
