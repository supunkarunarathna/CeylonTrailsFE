export default function StarRating({ rating = 0 }) {
  const rounded = Math.round(Number(rating));
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rounded)}
      {'☆'.repeat(Math.max(0, 5 - rounded))}
    </span>
  );
}
