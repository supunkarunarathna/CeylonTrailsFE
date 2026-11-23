import StarRating from './StarRating';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="card" style={{ padding: 26 }}>
      <StarRating rating={testimonial.rating} />
      <p style={{ marginTop: 12, fontStyle: 'italic' }}>&ldquo;{testimonial.message}&rdquo;</p>
      <p style={{ margin: 0, fontWeight: 600 }}>{testimonial.name}</p>
      {testimonial.country && <p className="text-muted" style={{ fontSize: 13, margin: 0 }}>{testimonial.country}</p>}
    </div>
  );
}
