const team = [
  { name: 'Nadeesha Perera', role: 'Founder & Head of Itineraries', bio: '15 years designing boutique trips across Sri Lanka.' },
  { name: 'Ruwan Fernando', role: 'Operations Lead', bio: 'Keeps every transfer, driver and stay running smoothly.' },
  { name: 'Aisha Rahman', role: 'Guest Experience', bio: 'Your first point of contact from enquiry to arrival.' },
];

export default function About() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Our Story</span>
        <h1>About Ceylon Trails</h1>
        <p className="text-muted" style={{ maxWidth: 600, margin: '0 auto' }}>
          We're a small team of Sri Lanka-based travel specialists who believe
          the best trips are the ones planned around how you actually want to
          travel — not a fixed template.
        </p>
      </div>

      <div className="section container">
        <div className="grid grid-2" style={{ alignItems: 'center' }}>
          <div>
            <h2>Why we built the itinerary planner</h2>
            <p>
              Every traveller is different — some want the flexibility of a
              tuk-tuk, others need a van for the whole family, and some are
              confident enough to self-drive with a valid licence. Rather
              than forcing everyone into the same packages, we built a
              planner that asks about your group, your preferred landscapes,
              your travel mode and your budget, then matches you against a
              library of vetted sample itineraries.
            </p>
            <p>
              It's a starting point, not the final word — our team refines
              every match into a fully custom quote once you reach out.
            </p>
          </div>
          <div className="card-media" style={{ borderRadius: 22 }}>
            <img src="https://images.unsplash.com/photo-1571847390590-8f8ee1e7d5f5?q=80&w=1200" alt="Sri Lanka hill country" />
          </div>
        </div>
      </div>

      <div className="section" style={{ background: 'var(--color-cream-deep)' }}>
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Meet the Team</span>
            <h2>The people behind your trip</h2>
          </div>
          <div className="grid grid-3">
            {team.map((member) => (
              <div key={member.name} className="card" style={{ padding: 26, textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--color-accent-soft)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--color-accent-dark)' }}>
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h3 style={{ fontSize: 17 }}>{member.name}</h3>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-accent-dark)', margin: '2px 0 10px' }}>{member.role}</p>
                <p className="text-muted" style={{ fontSize: 14 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
