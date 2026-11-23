import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toursApi, destinationsApi, testimonialsApi } from '../api/endpoints';
import TourCard from '../components/TourCard';
import DestinationCard from '../components/DestinationCard';
import TestimonialCard from '../components/TestimonialCard';
import LoadingSpinner from '../components/LoadingSpinner';

const whyItems = [
  { icon: '🧭', title: 'Locally Rooted Expertise', text: 'Every itinerary is designed with Sri Lankan travel specialists who know the roads, seasons and hidden gems.' },
  { icon: '🛠️', title: 'Build Your Own Trip', text: 'Answer a few quick questions and get 5 sample itineraries matched to your group, budget and travel style.' },
  { icon: '🏡', title: 'Boutique Stays', text: 'Handpicked villas, tea bungalows and eco-camps — never generic chain hotels.' },
  { icon: '🚐', title: 'Travel Your Way', text: 'Public transport, tuk-tuk, private car or van — we plan around how you actually want to get around.' },
];

export default function Home() {
  const [tours, setTours] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      toursApi.list({ featured: 'true' }),
      destinationsApi.list(),
      testimonialsApi.list(),
    ])
      .then(([t, d, te]) => {
        setTours(t.slice(0, 3));
        setDestinations(d.slice(0, 4));
        setTestimonials(te.slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="hero-inner">
          <span className="eyebrow" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Boutique Sri Lanka Travel</span>
          <h1>Sri Lanka, planned exactly your way</h1>
          <p className="lead">
            Browse handcrafted tours and boutique hotels, or answer a short
            questionnaire and let our planner build a shortlist of sample
            itineraries matched to your group, budget and travel style.
          </p>
          <div className="hero-actions">
            <Link to="/itinerary/build" className="btn btn-primary">Create Your Own Itinerary</Link>
            <Link to="/tours" className="btn btn-ghost">Browse Ready-Made Tours</Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>15+</strong><span>Years Curating Trips</span></div>
            <div className="hero-stat"><strong>4.8/5</strong><span>Average Traveller Rating</span></div>
            <div className="hero-stat"><strong>20+</strong><span>Sample Itineraries</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Why Ceylon Trails</span>
            <h2>Travel planning that adapts to you</h2>
          </div>
          <div className="grid grid-4">
            {whyItems.map((item) => (
              <div key={item.title} className="card" style={{ padding: 26 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: 17 }}>{item.title}</h3>
                <p className="text-muted" style={{ fontSize: 14 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-cream-deep)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            <div>
              <span className="eyebrow">Popular Destinations</span>
              <h2 style={{ margin: 0 }}>Where travellers are headed</h2>
            </div>
            <Link to="/destinations" className="btn btn-secondary">View all destinations</Link>
          </div>
          {loading ? <LoadingSpinner /> : (
            <div className="grid grid-4">
              {destinations.map((d) => <DestinationCard key={d.id} destination={d} />)}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            <div>
              <span className="eyebrow">Featured Tours</span>
              <h2 style={{ margin: 0 }}>Ready-made journeys</h2>
            </div>
            <Link to="/tours" className="btn btn-secondary">View all tours</Link>
          </div>
          {loading ? <LoadingSpinner /> : (
            <div className="grid grid-3">
              {tours.map((t) => <TourCard key={t.id} tour={t} />)}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            className="card"
            style={{
              padding: '56px 40px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, var(--color-ink), #2A3A63)',
              color: '#fff',
              border: 'none',
            }}
          >
            <span className="eyebrow" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>Create Your Own Itinerary</span>
            <h2 style={{ color: '#fff', maxWidth: 560, margin: '0 auto 12px' }}>Tell us how you like to travel — we'll do the rest</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 520, margin: '0 auto 28px' }}>
              Group size, driving license, preferred landscapes, travel mode and
              budget — answer six quick questions and get 5 sample itineraries
              matched to you in seconds.
            </p>
            <Link to="/itinerary/build" className="btn btn-primary">Start Building</Link>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section" style={{ background: 'var(--color-cream-deep)' }}>
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Traveller Stories</span>
              <h2>What our guests say</h2>
            </div>
            <div className="grid grid-3">
              {testimonials.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
