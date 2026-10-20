import React, { useState } from 'react';
import { Radio, Menu, X, Rocket, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrderClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar" role="banner">
      <div className="container navbar-container">
        {/* Brand */}
        <a href="#overview" className="navbar-brand" aria-label="AeroSync Home">
          <div className="brand-icon-box">
            <Radio size={20} />
          </div>
          <div className="brand-text-col">
            <span className="brand-name">
              AeroSync <span className="badge badge-blue">VAYU9</span>
            </span>
            <span className="brand-sub">Hybrid CanSat System · Team 0007</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="navbar-nav" aria-label="Main Navigation">
          <a href="#overview" className="nav-link">Overview</a>
          <a href="#products" className="nav-link">Products</a>
          <a href="#workflow" className="nav-link">Workflow</a>
          <a href="#hardware" className="nav-link">Hardware</a>
          <a href="#specs" className="nav-link">Specifications</a>
          <a href="#mission" className="nav-link">Mission</a>
          <a href="#impact" className="nav-link">Impact</a>
          <a href="#roadmap" className="nav-link">Roadmap</a>
        </nav>

        {/* Right CTA & Badges */}
        <div className="nav-badges">
          <span className="badge badge-amber" title="Event / Track">INCUBEX 2026</span>
          <button
            type="button"
            className="btn btn-primary"
            style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
            onClick={onOrderClick}
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
        <a href="#overview" className="nav-link" onClick={closeMobileMenu}>Overview</a>
        <a href="#products" className="nav-link" onClick={closeMobileMenu}>Product Variants</a>
        <a href="#workflow" className="nav-link" onClick={closeMobileMenu}>Flight Workflow</a>
        <a href="#hardware" className="nav-link" onClick={closeMobileMenu}>Hardware Gallery</a>
        <a href="#specs" className="nav-link" onClick={closeMobileMenu}>Technical Specs</a>
        <a href="#mission" className="nav-link" onClick={closeMobileMenu}>Mission Profile</a>
        <a href="#impact" className="nav-link" onClick={closeMobileMenu}>Real-World Impact</a>
        <a href="#roadmap" className="nav-link" onClick={closeMobileMenu}>Risks & Roadmap</a>
        <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              closeMobileMenu();
              onOrderClick();
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
