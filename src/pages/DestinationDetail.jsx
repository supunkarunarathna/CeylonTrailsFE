import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { destinationsApi } from '../api/endpoints';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DestinationDetail() {
  const { slug } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    setActiveImage(0);
    destinationsApi
      .getBySlug(slug)
      .then(setDestination)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error || !destination) {
    return (
      <div className="empty-state">
        <p>{error || 'Destination not found.'}</p>
        <Link to="/destinations" className="btn btn-secondary">Back to destinations</Link>
      </div>
    );
  }

  // Fall back to the single cover `image` if a destination has no `images` gallery yet.
  const gallery = destination.images?.length ? destination.images : [destination.image].filter(Boolean);

  return (
    <div>
      <div className="card-media" style={{ aspectRatio: '21/8', borderRadius: 0 }}>
        <img src={gallery[activeImage] || destination.image} alt={destination.name} />
      </div>

      <div className="container section">
        <span className="badge">{destination.region.replace('_', ' ')}</span>
        <h1>{destination.name}</h1>

        {/* 1. Common description */}
        <p style={{ maxWidth: 720, fontSize: 16 }}>{destination.description}</p>

        <div className="grid grid-2" style={{ gap: 40, marginTop: 12 }}>
          {/* 2. What this area is famous for */}
          {destination.famousFor?.length > 0 && (
            <div>
              <h3>Famous For</h3>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {destination.famousFor.map((item) => (
                  <li key={item} style={{ marginBottom: 8 }}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 3. Activities travelers can do here */}
          {destination.activities?.length > 0 && (
            <div>
              <h3>Things To Do</h3>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {destination.activities.map((item) => (
                  <li key={item} style={{ marginBottom: 8 }}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 4. Emergency information */}
        {destination.emergencyContacts && (
          <div className="card" style={{ padding: 24, marginTop: 32, borderColor: 'var(--color-danger)', background: '#FBF3F1' }}>
            <h3 style={{ marginTop: 0 }}>⚠️ In Case of Emergency</h3>
            <div className="grid grid-2" style={{ gap: 24, marginBottom: 16 }}>
              {destination.emergencyContacts.hospital && (
                <div>
                  <p className="text-muted" style={{ margin: '0 0 2px', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nearest Main Hospital</p>
                  <p style={{ margin: 0, fontWeight: 600 }}>{destination.emergencyContacts.hospital.name}</p>
                  {destination.emergencyContacts.hospital.note && (
                    <p className="text-muted" style={{ margin: '2px 0 0', fontSize: 13 }}>{destination.emergencyContacts.hospital.note}</p>
                  )}
                </div>
              )}
              {destination.emergencyContacts.policeStation && (
                <div>
                  <p className="text-muted" style={{ margin: '0 0 2px', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nearest Main Police Station</p>
                  <p style={{ margin: 0, fontWeight: 600 }}>{destination.emergencyContacts.policeStation.name}</p>
                  {destination.emergencyContacts.policeStation.note && (
                    <p className="text-muted" style={{ margin: '2px 0 0', fontSize: 13 }}>{destination.emergencyContacts.policeStation.note}</p>
                  )}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', borderTop: '1px solid var(--color-border)', paddingTop: 14 }}>
              <div>
                <p className="text-muted" style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Police Emergency (Nationwide)</p>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>119</p>
              </div>
              <div>
                <p className="text-muted" style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ambulance — Suwa Seriya (Nationwide)</p>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>1990</p>
              </div>
            </div>
            <p className="form-hint" style={{ marginTop: 14, marginBottom: 0 }}>
              These nationwide hotlines are free and available island-wide 24/7. The hospital and police station named above are the nearest main facilities as a general reference — please confirm current local contact details before relying on them in an emergency.
            </p>
          </div>
        )}

        {/* 5. Image gallery */}
        {gallery.length > 1 && (
          <div style={{ marginTop: 40 }}>
            <h3>Gallery</h3>
            <div className="grid grid-4">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className="card-media"
                  style={{
                    padding: 0,
                    border: i === activeImage ? '3px solid var(--color-accent)' : '1px solid var(--color-border)',
                    borderRadius: 14,
                    cursor: 'pointer',
                    background: 'none',
                  }}
                >
                  <img src={src} alt={`${destination.name} ${i + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 36 }}>
          <Link to="/itinerary/build" className="btn btn-primary">Build an itinerary around {destination.name}</Link>
        </div>
      </div>
    </div>
  );
}
