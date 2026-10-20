import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Radio, Menu, X, Rocket, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOrderClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrderClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleCtaClick = () => {
    if (onOrderClick) {
      onOrderClick();
    } else {
      navigate('/order');
    }
  };

  return (
    <header className="navbar" role="banner">
      <div className="container navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand" aria-label="AeroSync Home">
          <div className="brand-icon-box">
            <Radio size={20} />
          </div>
          <div className="brand-text-col">
            <span className="brand-name">
              AeroSync <span className="badge badge-blue">VAYU9</span>
            </span>
            <span className="brand-sub">Hybrid CanSat System · Team 0007</span>
          </div>
        </Link>

        {/* Desktop Nav Links (Pages Navigation) */}
        <nav className="navbar-nav" aria-label="Main Navigation">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Overview
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Products
          </NavLink>
          <NavLink to="/workflow" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Workflow
          </NavLink>
          <NavLink to="/hardware" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Hardware
          </NavLink>
          <NavLink to="/specifications" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Specs
          </NavLink>
          <NavLink to="/mission" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Mission
          </NavLink>
          <NavLink to="/impact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Impact
          </NavLink>
          <NavLink to="/roadmap" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Roadmap
          </NavLink>
        </nav>

        {/* Right CTA & Badges */}
        <div className="nav-badges">
          <span className="badge badge-amber" title="Event / Track">
            INCUBEX 2026
          </span>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              padding: '0.55rem 1.15rem',
              fontSize: '0.85rem',
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
            }}
            onClick={handleCtaClick}
          >
            <Rocket size={15} />
            <span>Order / Enquire</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-toggle"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMobileMenu}>
          Overview
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMobileMenu}>
          Product Variants
        </NavLink>
        <NavLink to="/workflow" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMobileMenu}>
          Flight Workflow
        </NavLink>
        <NavLink to="/hardware" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMobileMenu}>
          Hardware Gallery
        </NavLink>
        <NavLink to="/specifications" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMobileMenu}>
          Technical Specs
        </NavLink>
        <NavLink to="/mission" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMobileMenu}>
          Mission Profile
        </NavLink>
        <NavLink to="/impact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMobileMenu}>
          Real-World Impact
        </NavLink>
        <NavLink to="/roadmap" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMobileMenu}>
          Risks & Roadmap
        </NavLink>
        <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              closeMobileMenu();
              handleCtaClick();
            }}
          >
            <Rocket size={16} />
            <span>Order / Enquire Now</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
