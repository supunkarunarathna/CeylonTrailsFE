import { Link } from 'react-router-dom';

export default function DestinationCard({ destination }) {
  return (
    <Link to={`/destinations/${destination.slug}`} className="card destination-card">
      <div className="card-media">
        <img src={destination.image} alt={destination.name} loading="lazy" />
      </div>
      <div className="card-body">
        <span className="badge">{destination.region.replace('_', ' ')}</span>
        <h3>{destination.name}</h3>
        <p className="text-muted" style={{ fontSize: 14 }}>{destination.description}</p>
      </div>
    </Link>
  );
}
