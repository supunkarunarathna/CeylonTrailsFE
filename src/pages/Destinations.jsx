import { useEffect, useState } from 'react';
import { destinationsApi } from '../api/endpoints';
import DestinationCard from '../components/DestinationCard';
import LoadingSpinner from '../components/LoadingSpinner';

const regions = [
  { value: '', label: 'All Regions' },
  { value: 'coastal', label: 'Coastal' },
  { value: 'hill_country', label: 'Hill Country' },
  { value: 'cultural_triangle', label: 'Cultural Triangle' },
  { value: 'wildlife', label: 'Wildlife' },
  { value: 'city', label: 'City' },
];

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    destinationsApi
      .list(region ? { region } : {})
      .then(setDestinations)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [region]);

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Explore</span>
        <h1>Destinations across Sri Lanka</h1>
        <p className="text-muted">From coastal fort towns to misty tea country and ancient kingdoms.</p>
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
          ) : destinations.length === 0 ? (
            <div className="empty-state">No destinations found for this region yet.</div>
          ) : (
            <div className="grid grid-4">
              {destinations.map((d) => <DestinationCard key={d.id} destination={d} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
