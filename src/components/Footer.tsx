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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div className="brand-icon-box" style={{ width: '2.2rem', height: '2.2rem' }}>
                <Radio size={18} />
              </div>
              <h3 className="footer-brand-title">{PROJECT_INFO.name}</h3>
            </div>

            <p className="footer-brand-desc">
              {PROJECT_INFO.tagline}. Developed by Team {PROJECT_INFO.team} (Team ID: {PROJECT_INFO.teamId})
              for {PROJECT_INFO.event}.
            </p>

            <div className="footer-meta-badges">
              <span className="badge badge-amber">{PROJECT_INFO.event}</span>
              <span className="badge badge-blue">{PROJECT_INFO.track}</span>
              <span className="badge">{PROJECT_INFO.theme}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (Separate Pages) */}
          <div className="footer-col">
            <h4 className="footer-heading">Platform Architecture</h4>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link">Executive Overview</Link></li>
              <li><Link to="/products" className="footer-link">Hardware Kits (GPS &amp; Standard)</Link></li>
              <li><Link to="/workflow" className="footer-link">Telemetry Downlink Pipeline</Link></li>
              <li><Link to="/hardware" className="footer-link">Hardware &amp; Carrier Gallery</Link></li>
              <li><Link to="/specifications" className="footer-link">Technical Specs &amp; Mission Profile</Link></li>
              <li><Link to="/impact" className="footer-link">Market Impact &amp; Strategic Roadmap</Link></li>
              <li><Link to="/order" className="footer-link" style={{ color: 'var(--blue-bright)', fontWeight: 600 }}>Hardware Allocation &amp; Ordering</Link></li>
            </ul>
          </div>

          {/* Col 3: Media & Research Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Demonstration & Media</h4>
            <ul className="footer-links-list">
              <li>
                <a
                  href={PROJECT_INFO.videoFolderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#60a5fa' }}
                >
                  <Video size={15} />
                  <span>Project Video Demonstrations</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://ieeexplore.ieee.org/document/10245113/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <span>IEEE CanSat Air Quality Paper</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.sciencedirect.com/science/article/pii/S0273117724001856?via%3Dihub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <span>Advances in Space Research (2025)</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>

            <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 600 }}>
                <Compass size={14} color="var(--blue-bright)" />
                <span>Team VAYU9 · Team ID 0007</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginTop: '0.2rem' }}>
                Prototype Expo Track · Aerospace & Space Technology
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © 2026 AeroSync — Hybrid CanSat Telemetry & Launch Vehicle System. Team VAYU9.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Ignisia × IncubeX 2026</span>
            <span>•</span>
            <span>All hardware photos represent authentic prototypes</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
