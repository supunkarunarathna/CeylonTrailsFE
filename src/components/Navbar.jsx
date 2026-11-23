import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/destinations', label: 'Destinations' },
  { to: '/tours', label: 'Tours' },
  { to: '/hotels', label: 'Hotels' },
  { to: '/itinerary/build', label: 'Create Your Own Itinerary' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    setUserMenuOpen(false);
    setOpen(false);
    logout();
    navigate('/');
  };

  // Close the user menu when clicking anywhere outside of it.
  useEffect(() => {
    if (!userMenuOpen) return undefined;
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to={isAdmin ? '/admin/itineraries' : '/'} className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">C</span>
          Ceylon Trails
        </Link>

        <nav className={`nav-links ${open ? 'mobile-open' : ''}`}>
          {/* Admins get a stripped-down nav: no public site tabs, just the
              admin view and logout - there's nothing else for them to do here. */}
          {!isAdmin && links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
          {user ? (
            <>
              {isAdmin && (
                <NavLink to="/admin/itineraries" onClick={() => setOpen(false)}>Admin</NavLink>
              )}
              {/* "My Trips" (/dashboard) is hidden for regular users for now -
                  it'll come back once that feature is ready to ship. The page
                  and route still exist, just not linked from the nav. */}
              <div className="navbar-user-menu" ref={userMenuRef}>
                <button
                  type="button"
                  className="btn btn-secondary navbar-user-toggle"
                  onClick={() => setUserMenuOpen((o) => !o)}
                  aria-haspopup="true"
                  aria-expanded={userMenuOpen}
                >
                  {user.name?.split(' ')[0] || user.name}
                  <span className="navbar-user-caret">▾</span>
                </button>
                {userMenuOpen && (
                  <div className="navbar-user-dropdown">
                    <button type="button" onClick={handleLogout}>
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <NavLink to="/login" onClick={() => setOpen(false)} className="btn btn-primary">
              Log in
            </NavLink>
          )}
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
