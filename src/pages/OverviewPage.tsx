import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { StatStrip } from '../components/StatStrip';
import { ProblemSolution } from '../components/ProblemSolution';
import { SectionHeading } from '../components/SectionHeading';
import {
  Rocket,
  Activity,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  ShoppingCart
} from 'lucide-react';

interface OverviewPageProps {
  onOpenLightbox: (id: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onOpenLightbox }) => {
  const navigate = useNavigate();

  return (
    <div>
      {/* 1. Hero */}
      <Hero
        onExploreProducts={() => navigate('/products')}
        onExploreWorkflow={() => navigate('/workflow')}
        onOpenLightbox={onOpenLightbox}
      />

      {/* 2. Key Metrics & Targets Strip */}
      <StatStrip />

      {/* 3. Problem vs Solution */}
      <ProblemSolution />

      {/* 4. Quick Architecture Navigation Portal */}
      <section className="portal-section" style={{ padding: 'var(--section-space) 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Platform Directory"
            title="Explore AeroSync Subsystems"
            subtitle="Access individual platform pages for hardware variants, telemetry pipeline, avionics, flight profiles, and ordering."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {/* Products Card */}
            <Link
              to="/products"
              className="gallery-card"
              style={{ padding: '1.5rem', textDecoration: 'none', gap: '0.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="brand-icon-box" style={{ width: '2.5rem', height: '2.5rem' }}>
                  <Rocket size={20} />
                </div>
                <ArrowRight size={18} color="var(--blue-bright)" />
              </div>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Hardware Variants</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                AeroSync GPS (₹9,500) and AeroSync Standard (₹9,000) specifications, features, and sensor pinouts.
              </p>
            </Link>

            {/* Workflow Card */}
            <Link
              to="/workflow"
              className="gallery-card"
              style={{ padding: '1.5rem', textDecoration: 'none', gap: '0.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="brand-icon-box" style={{ width: '2.5rem', height: '2.5rem' }}>
                  <Activity size={20} />
                </div>
                <ArrowRight size={18} color="var(--blue-bright)" />
              </div>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Flight Workflow</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Four-phase mission execution and interactive 433 MHz LoRa telemetry transmission pipeline.
              </p>
            </Link>

            {/* Hardware Gallery Card */}
            <Link
              to="/hardware"
              className="gallery-card"
              style={{ padding: '1.5rem', textDecoration: 'none', gap: '0.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="brand-icon-box" style={{ width: '2.5rem', height: '2.5rem' }}>
                  <ShieldCheck size={20} />
                </div>
                <ArrowRight size={18} color="var(--blue-bright)" />
              </div>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Hardware & CAD</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                High-resolution CAD callouts and authentic photographs of the CanSat payload and carrier drone.
              </p>
            </Link>

            {/* Technical Specs Card */}
            <Link
              to="/specifications"
              className="gallery-card"
              style={{ padding: '1.5rem', textDecoration: 'none', gap: '0.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="brand-icon-box" style={{ width: '2.5rem', height: '2.5rem' }}>
                  <Cpu size={20} />
                </div>
                <ArrowRight size={18} color="var(--blue-bright)" />
              </div>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Technical Specs</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Avionics ratings (Teensy 4.1, BME280, SHT31, VEML6030, LSM9DS1), RF link parameters, and dimensions.
              </p>
            </Link>

            {/* Mission Profile Card */}
            <Link
              to="/mission"
              className="gallery-card"
              style={{ padding: '1.5rem', textDecoration: 'none', gap: '0.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="brand-icon-box" style={{ width: '2.5rem', height: '2.5rem' }}>
                  <Layers size={20} />
                </div>
                <ArrowRight size={18} color="var(--blue-bright)" />
              </div>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Mission Telemetry</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Simulated flight curves for barometric altitude and descent temperature profiles with raw data tables.
              </p>
            </Link>

            {/* Order Card */}
            <Link
              to="/order"
              className="gallery-card"
              style={{
                padding: '1.5rem',
                textDecoration: 'none',
                gap: '0.75rem',
                borderColor: 'rgba(59, 130, 246, 0.4)',
                background: 'rgba(59, 130, 246, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="brand-icon-box" style={{ width: '2.5rem', height: '2.5rem', background: 'var(--blue)' }}>
                  <ShoppingCart size={20} color="#ffffff" />
                </div>
                <ArrowRight size={18} color="var(--blue-bright)" />
              </div>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>Order & Reserve</h3>
              <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Reserve your CanSat platform with live database verification and ground dispatch coordination.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
