const images = [
  'https://images.unsplash.com/photo-1586183189334-1a1a1a2b1b1a?q=80&w=900',
  'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=900',
  'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?q=80&w=900',
  'https://images.unsplash.com/photo-1571847390590-8f8ee1e7d5f5?q=80&w=900',
  'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=900',
  'https://images.unsplash.com/photo-1625124326157-ef5b8bfa8b3f?q=80&w=900',
  'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=900',
  'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?q=80&w=900',
  'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=900',
];

export default function Gallery() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Gallery</span>
        <h1>Sri Lanka in pictures</h1>
      </div>
      <div className="section container">
        <div className="grid grid-3">
          {images.map((src, i) => (
            <div key={i} className="card-media" style={{ borderRadius: 16 }}>
              <img src={src} alt={`Sri Lanka gallery ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
