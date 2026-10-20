import React from 'react';
import { DollarSign, ShieldAlert, Sparkles } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { RISKS_AND_MITIGATIONS, FUTURE_ROADMAP, PROJECT_INFO } from '../data/mission';

export const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="roadmap-section" aria-labelledby="roadmap-title">
      <div className="container">
        <SectionHeading
          id="roadmap-title"
          eyebrow="Slide 07 · Design Reliability & Outlook"
          title="Risks, Mitigations & Future Roadmap"
          subtitle="Engineering risk management protocols alongside next-generation aerospace development milestones."
        />

        {/* Two-Column Grid: Risks vs Future Roadmap */}
        <div className="risks-roadmap-grid">
          {/* Left Column: Risks & Mitigations */}
          <div className="risks-container">
            <h3 className="col-heading">
              <ShieldAlert size={22} color="var(--red)" />
              <span>Identified Risks & Mitigations</span>
            </h3>

            {RISKS_AND_MITIGATIONS.map((item, idx) => (
              <div key={idx} className="risk-item-card">
                <div className="risk-header">
                  <span className="risk-title">{item.risk}</span>
                  <span className="badge" style={{ fontSize: '0.68rem' }}>
                    {item.type}
                  </span>
                </div>
                <p className="risk-mitigation">
                  <strong style={{ color: '#6ee7b7' }}>Mitigation: </strong>
                  {item.mitigation}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Future Roadmap */}
          <div className="roadmap-container">
            <h3 className="col-heading">
              <Sparkles size={22} color="var(--blue-bright)" />
              <span>Future Development Roadmap</span>
            </h3>

            {FUTURE_ROADMAP.map((item, idx) => (
              <div key={idx} className="roadmap-item-card">
                <div className="roadmap-header">
                  <span className="roadmap-title">{item.title}</span>
                  <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>
                    {item.status}
                  </span>
                </div>
                <p className="roadmap-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Economic Feasibility Callout */}
        <div className="feasibility-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', color: 'var(--amber)' }}>
              <DollarSign size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                Economic Feasibility & Cost Architecture
              </div>
              <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                Reported Prototype Build-Cost Target: <strong>{PROJECT_INFO.buildCostTarget}</strong> (presentation source claim).
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', maxWidth: '28rem' }}>
            Note: Prototype build cost represents raw BOM expenditure. Product kit prices (₹9,500 GPS / ₹9,000 Standard) include pre-assembled carrier drop mounts, tested Teensy firmware, and ground receiver hardware.
          </div>
        </div>
      </div>
    </section>
  );
};
