import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { itineraryApi } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const TRAVEL_MODE_LABELS = {
  public_transport: 'Public Transport',
  tuk_tuk: 'Tuk Tuk',
  car: 'Car',
  van: 'Van',
};

const LOCATION_LABELS = {
  coastal: 'Coastal Area',
  hill_country: 'Hill Country',
  traditional: 'Traditional Places',
};

export default function Dashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    itineraryApi
      .mine()
      .then(setRequests)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">My Trips</span>
        <h1>Welcome back, {user?.name?.split(' ')[0] || 'Traveller'}</h1>
        <p className="text-muted">Every itinerary request you've submitted, saved to your account.</p>
      </div>

      <div className="section container">
        <div style={{ marginBottom: 28 }}>
          <Link to="/itinerary/build" className="btn btn-primary">+ Create a New Itinerary</Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : requests.length === 0 ? (
          <div className="empty-state">
            <p>You haven't created any itineraries yet.</p>
            <Link to="/itinerary/build" className="btn btn-primary">Create Your Own Itinerary</Link>
          </div>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="card" style={{ padding: 26, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                <div>
                  <h3 style={{ margin: 0 }}>Request from {new Date(req.createdAt).toLocaleDateString()}</h3>
                  <p className="text-muted" style={{ margin: '4px 0 0', fontSize: 14 }}>
                    {req.adults} adult{req.adults === 1 ? '' : 's'}
                    {req.children > 0 ? `, ${req.children} child${req.children === 1 ? '' : 'ren'}` : ''} ·{' '}
                    {TRAVEL_MODE_LABELS[req.travelMode]} · Budget ${Number(req.budget).toFixed(0)}/person
                  </p>
                </div>
                <div className="chip-group">
                  {(req.locationPreferences || []).map((loc) => (
                    <span key={loc} className="chip" style={{ cursor: 'default' }}>{LOCATION_LABELS[loc] || loc}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-3">
                {req.matches.map((m) => (
                  <div key={m.id} className="card" style={{ padding: 16 }}>
                    <h4 style={{ margin: '0 0 6px', fontSize: 15 }}>{m.title}</h4>
                    <p className="text-muted" style={{ fontSize: 13, margin: 0 }}>{m.durationDays} days · ${Number(m.pricePerPerson).toFixed(0)}/person</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
