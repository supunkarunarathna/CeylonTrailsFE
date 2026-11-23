import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const LOCATION_LABELS = {
  coastal: 'Coastal Area',
  hill_country: 'Hill Country',
  traditional: 'Traditional Places',
};

const TRAVEL_MODE_LABELS = {
  public_transport: 'Public Transport',
  tuk_tuk: 'Tuk Tuk',
  car: 'Car',
  van: 'Van',
};

function MatchCard({ match, expanded, onToggle }) {
  return (
    <div className="card" style={{ overflow: 'visible' }}>
      {match.image && (
        <div className="card-media">
          <img src={match.image} alt={match.title} loading="lazy" />
        </div>
      )}
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <span className="badge">{match.durationDays} days · {TRAVEL_MODE_LABELS[match.travelMode]}</span>
            <h3 style={{ marginTop: 8 }}>{match.title}</h3>
          </div>
          <span className="price-tag">${Number(match.pricePerPerson).toFixed(0)}</span>
        </div>
        <p className="text-muted" style={{ fontSize: 14 }}>{match.description}</p>

        <div className="chip-group" style={{ marginBottom: 4 }}>
          {(match.locationTypes || []).map((loc) => (
            <span key={loc} className="chip" style={{ cursor: 'default' }}>{LOCATION_LABELS[loc] || loc}</span>
          ))}
        </div>

        <div style={{ marginTop: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span className="text-muted">Match score</span>
            <strong>{Math.min(100, Math.max(0, match.matchScore))}%</strong>
          </div>
          <div className="match-score-bar">
            <div className="match-score-fill" style={{ width: `${Math.min(100, Math.max(0, match.matchScore))}%` }} />
          </div>
        </div>

        <button type="button" className="btn btn-secondary" style={{ marginTop: 16 }} onClick={onToggle}>
          {expanded ? 'Hide day-by-day plan' : 'View day-by-day plan'}
        </button>

        {expanded && match.dayPlan?.length > 0 && (
          <div style={{ marginTop: 12 }}>
            {match.dayPlan.map((d) => (
              <div key={d.day} className="day-plan-item">
                <div className="day-plan-number">{d.day}</div>
                <div>
                  <strong>{d.title}</strong>
                  <p className="text-muted" style={{ margin: '4px 0 0' }}>{d.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ItineraryResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);

  const result = location.state?.result;
  const submittedForm = location.state?.submittedForm;

  if (!result) {
    return (
      <div className="empty-state" style={{ padding: '100px 20px' }}>
        <h2>No itinerary results yet</h2>
        <p className="text-muted">Fill out the form to get your 5 matched itineraries.</p>
        <Link to="/itinerary/build" className="btn btn-primary">Create Your Own Itinerary</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Your Matches</span>
        <h1>{submittedForm?.name ? `${submittedForm.name}, here are your top 5 itineraries` : 'Your Top 5 Itineraries'}</h1>
        <p className="text-muted">
          Based on {result.totalHeadcount} traveller{result.totalHeadcount === 1 ? '' : 's'}
          {submittedForm ? `, ${TRAVEL_MODE_LABELS[submittedForm.travelMode]?.toLowerCase()}, and a budget of $${submittedForm.budget} per person` : ''}.
        </p>
      </div>

      <div className="section container">
        {result.matches.length === 0 ? (
          <div className="empty-state">
            <p>We couldn't find a strong match for these preferences yet. Try adjusting your budget or travel mode.</p>
            <Link to="/itinerary/build" className="btn btn-primary">Adjust My Preferences</Link>
          </div>
        ) : (
          <>
            <div className="grid grid-3">
              {result.matches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  expanded={expandedId === match.id}
                  onToggle={() => setExpandedId((id) => (id === match.id ? null : match.id))}
                />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <p className="text-muted" style={{ marginBottom: 16 }}>
                Like one of these? Our team can turn it into a fully custom, bookable trip.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary">Talk to a Travel Consultant</Link>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/itinerary/build')}>
                  Start Over
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
