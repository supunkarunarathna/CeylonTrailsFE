import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toursApi } from '../api/endpoints';
import TourCard from '../components/TourCard';
import LoadingSpinner from '../components/LoadingSpinner';

const categories = [
  { value: '', label: 'All Tours' },
  { value: 'coastal', label: 'Coastal' },
  { value: 'hill_country', label: 'Hill Country' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'wildlife', label: 'Wildlife' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'family', label: 'Family' },
];

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category) params.category = category;
    if (search) params.search = search;
    toursApi
      .list(params)
      .then(setTours)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category, search]);

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Ready-Made Journeys</span>
        <h1>Tours &amp; Packages</h1>
        <p className="text-muted">Prefer to build something unique instead? Try our <Link to="/itinerary/build">itinerary planner</Link>.</p>
      </div>

      <div className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32, alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="chip-group">
              {categories.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={`chip ${category === c.value ? 'selected' : ''}`}
                  onClick={() => setCategory(c.value)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search tours…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: 999, border: '1px solid var(--color-border)', minWidth: 220 }}
            />
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : tours.length === 0 ? (
            <div className="empty-state">No tours match your filters yet.</div>
          ) : (
            <div className="grid grid-3">
              {tours.map((t) => <TourCard key={t.id} tour={t} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
