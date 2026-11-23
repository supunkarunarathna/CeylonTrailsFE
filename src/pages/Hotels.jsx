import { useEffect, useState } from 'react';
import { hotelsApi } from '../api/endpoints';
import HotelCard from '../components/HotelCard';
import LoadingSpinner from '../components/LoadingSpinner';

const regions = [
  { value: '', label: 'All Regions' },
  { value: 'coastal', label: 'Coastal' },
  { value: 'hill_country', label: 'Hill Country' },
  { value: 'cultural_triangle', label: 'Cultural Triangle' },
  { value: 'wildlife', label: 'Wildlife' },
  { value: 'city', label: 'City' },
];

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    hotelsApi
      .list(region ? { region } : {})
      .then(setHotels)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [region]);

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Boutique Stays</span>
        <h1>Hotels &amp; Boutique Villas</h1>
        <p className="text-muted">Handpicked stays, never generic chain hotels.</p>
      </div>

      <div className="section">
        <div className="container">
          <div className="chip-group" style={{ marginBottom: 36, justifyContent: 'center' }}>
            {regions.map((r) => (
              <button
                key={r.value}
                type="button"
                className={`chip ${region === r.value ? 'selected' : ''}`}
                onClick={() => setRegion(r.value)}
              >
                {r.label}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : hotels.length === 0 ? (
            <div className="empty-state">No hotels found for this region yet.</div>
          ) : (
            <div className="grid grid-3">
              {hotels.map((h) => <HotelCard key={h.id} hotel={h} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
