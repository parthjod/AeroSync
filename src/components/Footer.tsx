import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, ExternalLink, Video, Compass } from 'lucide-react';
import { PROJECT_INFO } from '../data/mission';

export const Footer: React.FC = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Col 1: Brand & Project Identity */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="brand-icon-box" style={{ width: '2rem', height: '2rem' }}>
                <Radio size={16} />
              </div>
              <h3 className="footer-brand-title">{PROJECT_INFO.name}</h3>
            </div>

            <p className="footer-brand-desc">
              {PROJECT_INFO.tagline}. Developed by Team {PROJECT_INFO.team} (Team ID: {PROJECT_INFO.teamId}) for {PROJECT_INFO.event}.
            </p>

            <div className="footer-meta-badges">
              <span className="badge badge-amber" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>{PROJECT_INFO.event}</span>
              <span className="badge badge-blue" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>{PROJECT_INFO.track}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 Columns for Low Height) */}
          <div className="footer-col">
            <h4 className="footer-heading">Platform Architecture</h4>
            <ul className="footer-links-grid">
              <li><Link to="/" className="footer-link">Executive Overview</Link></li>
              <li><Link to="/products" className="footer-link">Hardware Kits (₹15k/₹14k)</Link></li>
              <li><Link to="/workflow" className="footer-link">Telemetry Pipeline</Link></li>
              <li><Link to="/hardware" className="footer-link">Payload &amp; CAD Gallery</Link></li>
              <li><Link to="/specifications" className="footer-link">Technical Specs &amp; Mission</Link></li>
              <li><Link to="/impact" className="footer-link">Impact &amp; Strategic Roadmap</Link></li>
              <li style={{ gridColumn: 'span 2' }}>
                <Link to="/order" className="footer-link">
                  Hardware Allocation &amp; Ordering →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Media & Research Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Demonstration &amp; Media</h4>
            <ul className="footer-links-list">
              <li>
                <a
                  href={PROJECT_INFO.videoFolderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Video size={14} />
                  <span>Project Video Demonstrations</span>
                  <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://ieeexplore.ieee.org/document/10245113/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <span>IEEE CanSat Air Quality Paper</span>
                  <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.sciencedirect.com/science/article/pii/S0273117724001856?via%3Dihub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <span>Advances in Space Research (2025)</span>
                  <ExternalLink size={11} />
                </a>
              </li>
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.74rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
              <Compass size={13} color="var(--blue-bright)" />
              <span>Team VAYU9 · Team ID 0007 · IncubeX 2026</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © 2026 AeroSync — Hybrid CanSat Telemetry &amp; Launch Vehicle System. Team VAYU9.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>Ignisia × IncubeX 2026</span>
            <span>•</span>
            <span>All hardware photos represent authentic prototypes</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
