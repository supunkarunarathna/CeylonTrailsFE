import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toursApi } from '../api/endpoints';
import LoadingSpinner from '../components/LoadingSpinner';
import StarRating from '../components/StarRating';

export default function TourDetail() {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    toursApi
      .getBySlug(slug)
      .then(setTour)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error || !tour) {
    return (
      <div className="empty-state">
        <p>{error || 'Tour not found.'}</p>
        <Link to="/tours" className="btn btn-secondary">Back to tours</Link>
      </div>
    );
  }

  const image = tour.images?.[0];

  return (
    <div>
      {image && (
        <div className="card-media" style={{ aspectRatio: '21/8', borderRadius: 0 }}>
          <img src={image} alt={tour.title} />
        </div>
      )}
      <div className="container section">
        <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 48 }}>
          <div>
            <span className="badge">{tour.category.replace('_', ' ')}</span>
            <h1>{tour.title}</h1>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 20 }}>
              <StarRating rating={tour.rating} />
              <span className="text-muted">{tour.durationDays} days</span>
            </div>
            <p>{tour.description}</p>

            {tour.highlights?.length > 0 && (
              <>
                <h3>Highlights</h3>
                <div className="chip-group" style={{ marginBottom: 30 }}>
                  {tour.highlights.map((h) => <span key={h} className="chip">{h}</span>)}
                </div>
              </>
            )}

            {tour.dayPlan?.length > 0 && (
              <>
                <h3>Day-by-day itinerary</h3>
                <div>
                  {tour.dayPlan.map((d) => (
                    <div key={d.day} className="day-plan-item">
                      <div className="day-plan-number">{d.day}</div>
                      <div>
                        <strong>{d.title}</strong>
                        <p className="text-muted" style={{ margin: '4px 0 0' }}>{d.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside>
            <div className="card" style={{ padding: 26, position: 'sticky', top: 100 }}>
              <p className="text-muted" style={{ marginBottom: 4 }}>Starting from</p>
              <p className="price-tag" style={{ fontSize: 30, marginBottom: 18 }}>${Number(tour.price).toFixed(0)} <span style={{ fontSize: 14, color: 'var(--color-ink-soft)', fontWeight: 400 }}>/ person</span></p>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%', marginBottom: 12 }}>Enquire About This Tour</Link>
              <Link to="/itinerary/build" className="btn btn-secondary" style={{ width: '100%' }}>Customize This Trip Instead</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
