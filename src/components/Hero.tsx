import React from 'react';
import { ArrowRight, Activity, ShieldCheck, Compass, Radio } from 'lucide-react';
import cansatImg from '../assets/cansat.png';
import droneImg from '../assets/drone.png';
import { PROJECT_INFO } from '../data/mission';

interface HeroProps {
  onExploreProducts: () => void;
  onExploreWorkflow: () => void;
  onOpenLightbox: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProducts,
  onExploreWorkflow,
  onOpenLightbox,
}) => {
  return (
    <section id="overview" className="hero-section" aria-labelledby="hero-title">
      <div className="container hero-grid">
        {/* Left Column: Hero Copy & Actions */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="badge badge-amber">{PROJECT_INFO.event}</span>
            <span className="badge badge-blue">{PROJECT_INFO.track}</span>
            <span className="badge">{PROJECT_INFO.theme}</span>
          </div>

          <h1 id="hero-title" className="hero-title">
            AeroSync <br />
            <span className="hero-title-highlight">Hybrid CanSat System</span>
          </h1>

          <p className="hero-subtitle">
            A compact airborne sensing and telemetry platform delivering real-time atmospheric,
            illumination, 9-DOF inertial dynamics, and GPS trajectory downlinks over 433 MHz LoRa.
          </p>

          <div className="hero-meta-strip">
            <div className="hero-meta-item">
              <Compass size={16} />
              <span>Team: <strong>{PROJECT_INFO.team}</strong></span>
            </div>
            <span style={{ color: 'var(--border)' }}>•</span>
            <div className="hero-meta-item">
              <span>Team ID: <strong>{PROJECT_INFO.teamId}</strong></span>
            </div>
            <span style={{ color: 'var(--border)' }}>•</span>
            <div className="hero-meta-item">
              <Radio size={16} />
              <span>Link: <strong>433 MHz LoRa</strong></span>
            </div>
          </div>

          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onExploreProducts}
            >
              <span>Explore CanSat Variants</span>
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onExploreWorkflow}
            >
              <Activity size={17} />
              <span>See How It Works</span>
            </button>
          </div>
        </div>

        {/* Right Column: Physical Hardware Preview Card */}
        <div className="hero-preview-col">
          <div className="hero-preview-card">
            <div className="hero-status-pill">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="pulse-indicator" />
                <span style={{ fontWeight: 600, color: '#f8fafc' }}>
                  Hardware Prototype Rig Ready
                </span>
              </div>
              <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                VAYU9-0007
              </span>
            </div>

            {/* Split Images: Drone Carrier + CanSat Payload */}
            <div className="hero-img-container">
              <div
                className="hero-img-box"
                onClick={() => onOpenLightbox('drone-actual')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onOpenLightbox('drone-actual')}
                title="Click to expand Quadcopter Carrier Prototype"
              >
                <img
                  src={droneImg}
                  alt="Actual Quadcopter Carrier Launch Vehicle Prototype"
                  className="hero-img"
                  loading="eager"
                />
                <span className="hero-img-caption">Carrier Launch Vehicle</span>
              </div>

              <div
                className="hero-img-box"
                onClick={() => onOpenLightbox('cansat-actual')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onOpenLightbox('cansat-actual')}
                title="Click to expand CanSat Telemetry Enclosure"
              >
                <img
                  src={cansatImg}
                  alt="Actual CanSat Telemetry Enclosure Prototype"
                  className="hero-img"
                  loading="eager"
                />
                <span className="hero-img-caption">CanSat Telemetry Payload</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-subtle)', padding: '0.25rem 0.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={14} color="var(--green)" />
                Authentic Hardware Photos
              </span>
              <span>Tap photo to view high-res callouts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
