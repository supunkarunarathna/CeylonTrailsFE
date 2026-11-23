import { useState } from 'react';

/**
 * Clickable 1-5 star picker used on the "Write a review" form.
 * `value` is the currently selected rating (0 = none selected yet).
 */
export default function StarRatingInput({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div role="radiogroup" aria-label="Star rating" style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 30,
            lineHeight: 1,
            padding: 2,
            color: star <= display ? 'var(--color-gold)' : 'var(--color-border)',
            transition: 'color 0.1s ease',
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}
