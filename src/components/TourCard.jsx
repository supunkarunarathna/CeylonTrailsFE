import { Link } from 'react-router-dom';
import StarRating from './StarRating';

export default function TourCard({ tour }) {
  const image = tour.images?.[0] || 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200';
  return (
    <Link to={`/tours/${tour.slug}`} className="card tour-card">
      <div className="card-media">
        <img src={image} alt={tour.title} loading="lazy" />
      </div>
      <div className="card-body">
        <span className="badge">{tour.durationDays} days · {tour.category.replace('_', ' ')}</span>
        <h3>{tour.title}</h3>
        <p className="text-muted" style={{ fontSize: 14 }}>{tour.summary}</p>
        <div className="card-meta">
          <StarRating rating={tour.rating} />
          <span className="price-tag">${Number(tour.price).toFixed(0)}<span style={{ fontSize: 12, color: 'var(--color-ink-soft)', fontWeight: 400 }}> /person</span></span>
        </div>
      </div>
    </Link>
  );
}
