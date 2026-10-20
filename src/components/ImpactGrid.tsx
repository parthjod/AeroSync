import React from 'react';
import { CloudSun, Sprout, ShieldAlert, GraduationCap, ArrowRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { IMPACT_USE_CASES } from '../data/mission';

const ICON_MAP: Record<string, React.ReactNode> = {
  CloudSun: <CloudSun size={24} />,
  Sprout: <Sprout size={24} />,
  ShieldAlert: <ShieldAlert size={24} />,
  GraduationCap: <GraduationCap size={24} />
};

export const ImpactGrid: React.FC = () => {
  return (
    <section id="impact" className="impact-section" aria-labelledby="impact-title">
      <div className="container">
        <SectionHeading
          id="impact-title"
          eyebrow="Slide 06 · Application Potential"
          title="Real-World Impact & Deployment Use Cases"
          subtitle="Target applications where low-cost, airborne multi-domain telemetry unlocks accessible data collection."
        />

        {/* 4 Cards */}
        <div className="impact-grid">
          {IMPACT_USE_CASES.map((item, idx) => (
            <div key={idx} className="impact-card">
              <div className="impact-icon-box">
                {ICON_MAP[item.icon] || <CloudSun size={24} />}
              </div>

              <h3 className="impact-title">{item.title}</h3>
              <p className="impact-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Data Flow Strip from presentation */}
        <div className="impact-pipeline-strip">
          <span className="impact-flow-node">Airborne CanSat</span>
          <ArrowRight size={16} className="impact-flow-arrow" />
          <span className="impact-flow-node">Multi-Domain Atmospheric Sensing</span>
          <ArrowRight size={16} className="impact-flow-arrow" />
          <span className="impact-flow-node">Real-Time 433 MHz LoRa Telemetry</span>
          <ArrowRight size={16} className="impact-flow-arrow" />
          <span className="impact-flow-node" style={{ color: 'var(--blue-bright)' }}>
            Environmental & Disaster Intelligence
          </span>
        </div>
      </div>
    </section>
  );
};
