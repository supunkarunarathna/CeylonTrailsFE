import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ color: '#fff', marginBottom: 14 }}>
              <span className="brand-mark">C</span>
              Ceylon Trails
            </div>
            <p style={{ maxWidth: 300, fontSize: 14 }}>
              Handcrafted boutique journeys across Sri Lanka — from misty tea
              country to golden coastlines — plus a planner that builds a
              trip around exactly how you want to travel.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/tours">Tours</Link></li>
              <li><Link to="/hotels">Hotels</Link></li>
              <li><Link to="/itinerary/build">Create Your Own Itinerary</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li>hello@ceylontrails.com</li>
              <li>+94 77 123 4567</li>
              <li>No. 24, Galle Road, Colombo 03, Sri Lanka</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} Ceylon Trails. All rights reserved.</span>
          <span>Designed for travellers who plan their own way.</span>
        </div>
      </div>
    </footer>
  );
}
