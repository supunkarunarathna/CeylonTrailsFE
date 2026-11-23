import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogApi, testimonialsApi } from '../api/endpoints';
import LoadingSpinner from '../components/LoadingSpinner';
import TestimonialCard from '../components/TestimonialCard';
import StarRatingInput from '../components/StarRatingInput';

const initialForm = { name: '', country: '', rating: 0, message: '', tourCode: '' };

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  // Reloads the feedback list straight from the database — used on first
  // load and again right after a new review is submitted, so the list
  // always reflects what's actually saved server-side.
  const loadTestimonials = () => {
    setTestimonialsLoading(true);
    return testimonialsApi
      .list()
      .then(setTestimonials)
      .catch(() => {})
      .finally(() => setTestimonialsLoading(false));
  };

  useEffect(() => {
    blogApi.list().then(setPosts).catch(() => {}).finally(() => setPostsLoading(false));
    loadTestimonials();
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.rating) {
      setStatus({ loading: false, error: 'Please select a star rating.', success: '' });
      return;
    }

    setStatus({ loading: true, error: '', success: '' });
    try {
      await testimonialsApi.create(form);
      setForm(initialForm);
      setStatus({ loading: false, error: '', success: 'Thank you for sharing your experience!' });
      await loadTestimonials();
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: '' });
    }
  };

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Travel Journal</span>
        <h1>Stories &amp; Travel Tips</h1>
      </div>

      <div className="section container">
        {postsLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-3">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card">
                {post.image && (
                  <div className="card-media">
                    <img src={post.image} alt={post.title} loading="lazy" />
                  </div>
                )}
                <div className="card-body">
                  <span className="badge">{new Date(post.publishedAt).toLocaleDateString()}</span>
                  <h3>{post.title}</h3>
                  <p className="text-muted" style={{ fontSize: 14 }}>{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="section" style={{ background: 'var(--color-cream-deep)' }}>
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Traveler Feedback</span>
            <h2>What travelers are saying</h2>
            <p className="text-muted">Real reviews from guests who've travelled with us, straight from our database.</p>
          </div>

          {testimonialsLoading ? (
            <LoadingSpinner />
          ) : testimonials.length === 0 ? (
            <div className="empty-state" style={{ padding: '20px 20px 48px' }}>Be the first to share your experience below.</div>
          ) : (
            <div className="grid grid-3" style={{ marginBottom: 48 }}>
              {testimonials.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}
            </div>
          )}

          <div className="card" style={{ padding: 34, maxWidth: 620, margin: '0 auto' }}>
            <h3 style={{ marginTop: 0 }}>Share Your Experience</h3>
            {status.error && <div className="alert alert-error">{status.error}</div>}
            {status.success && <div className="alert alert-success">{status.success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="fb-name">Your name</label>
                <input id="fb-name" name="name" type="text" required value={form.name} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="fb-country">Country (optional)</label>
                <input id="fb-country" name="country" type="text" value={form.country} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="fb-tour-code">Tour code</label>
                <input
                  id="fb-tour-code"
                  name="tourCode"
                  type="text"
                  required
                  minLength={4}
                  maxLength={40}
                  placeholder="e.g. the code from your booking confirmation"
                  value={form.tourCode}
                  onChange={handleChange}
                />
                <span className="form-hint">Found on your booking confirmation. Each tour code can only be used to post one review.</span>
              </div>
              <div className="form-field">
                <label>Your rating</label>
                <StarRatingInput value={form.rating} onChange={(rating) => setForm((f) => ({ ...f, rating }))} />
              </div>
              <div className="form-field">
                <label htmlFor="fb-message">Your feedback</label>
                <textarea
                  id="fb-message"
                  name="message"
                  rows={4}
                  required
                  minLength={10}
                  placeholder="Tell other travelers about your trip…"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={status.loading} style={{ width: '100%' }}>
                {status.loading ? 'Submitting…' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
