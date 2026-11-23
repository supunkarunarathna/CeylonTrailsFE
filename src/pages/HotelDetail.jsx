import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { hotelsApi } from '../api/endpoints';
import LoadingSpinner from '../components/LoadingSpinner';
import StarRating from '../components/StarRating';

export default function HotelDetail() {
  const { slug } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    hotelsApi
      .getBySlug(slug)
      .then(setHotel)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error || !hotel) {
    return (
      <div className="empty-state">
        <p>{error || 'Hotel not found.'}</p>
        <Link to="/hotels" className="btn btn-secondary">Back to hotels</Link>
      </div>
    );
  }

  const image = hotel.images?.[0];

  return (
    <div>
      {image && (
        <div className="card-media" style={{ aspectRatio: '21/8', borderRadius: 0 }}>
          <img src={image} alt={hotel.name} />
        </div>
      )}
      <div className="container section">
        <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 48 }}>
          <div>
            <span className="badge">{hotel.location}</span>
            <h1>{hotel.name}</h1>
            <StarRating rating={hotel.rating} />
            <p style={{ marginTop: 16 }}>{hotel.description}</p>

            {hotel.amenities?.length > 0 && (
              <>
                <h3>Amenities</h3>
                <div className="chip-group">
                  {hotel.amenities.map((a) => <span key={a} className="chip">{a}</span>)}
                </div>
              </>
            )}
          </div>

          <aside>
            <div className="card" style={{ padding: 26, position: 'sticky', top: 100 }}>
              <p className="text-muted" style={{ marginBottom: 4 }}>From</p>
              <p className="price-tag" style={{ fontSize: 30, marginBottom: 18 }}>${Number(hotel.pricePerNight).toFixed(0)} <span style={{ fontSize: 14, color: 'var(--color-ink-soft)', fontWeight: 400 }}>/ night</span></p>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>Enquire About This Stay</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
