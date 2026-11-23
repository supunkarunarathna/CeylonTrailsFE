import { Link } from 'react-router-dom';
import StarRating from './StarRating';

export default function HotelCard({ hotel }) {
  const image = hotel.images?.[0] || 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200';
  return (
    <Link to={`/hotels/${hotel.slug}`} className="card hotel-card">
      <div className="card-media">
        <img src={image} alt={hotel.name} loading="lazy" />
      </div>
      <div className="card-body">
        <span className="badge">{hotel.location}</span>
        <h3>{hotel.name}</h3>
        <p className="text-muted" style={{ fontSize: 14 }}>{hotel.description}</p>
        <div className="card-meta">
          <StarRating rating={hotel.rating} />
          <span className="price-tag">${Number(hotel.pricePerNight).toFixed(0)}<span style={{ fontSize: 12, color: 'var(--color-ink-soft)', fontWeight: 400 }}> /night</span></span>
        </div>
      </div>
    </Link>
  );
}
