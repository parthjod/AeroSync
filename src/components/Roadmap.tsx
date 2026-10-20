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
          eyebrow="Design Reliability & Outlook"
          title="Risks, Mitigations & Future Roadmap"
          subtitle="Engineering risk management protocols alongside next-generation aerospace development milestones."
        />

        {/* Structured Aligned Grid */}
        <div className="roadmap-aligned-container">
          {/* Aligned Column Headers */}
          <div className="roadmap-grid-header">
            <h3 className="col-heading">
              <ShieldAlert size={22} color="var(--red)" />
              <span>Identified Risks & Mitigations</span>
            </h3>

            <h3 className="col-heading">
              <Sparkles size={22} color="var(--blue-bright)" />
              <span>Future Development Roadmap</span>
            </h3>
          </div>

          {/* Symmetrical Paired Rows */}
          <div className="roadmap-paired-rows">
            {RISKS_AND_MITIGATIONS.map((risk, idx) => {
              const roadmapItem = FUTURE_ROADMAP[idx];
              return (
                <div key={idx} className="roadmap-paired-row">
                  {/* Left: Risk Item */}
                  <div className="risk-item-card aligned-card">
                    <div className="risk-header">
                      <span className="risk-title">{risk.risk}</span>
                      <span className="badge" style={{ fontSize: '0.68rem' }}>
                        {risk.type}
                      </span>
                    </div>
                    <p className="risk-mitigation">
                      <strong style={{ color: '#6ee7b7' }}>Mitigation: </strong>
                      {risk.mitigation}
                    </p>
                  </div>

                  {/* Right: Roadmap Item */}
                  <div className="roadmap-item-card aligned-card">
                    <div className="roadmap-header">
                      <span className="roadmap-title">{roadmapItem.title}</span>
                      <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>
                        {roadmapItem.status}
                      </span>
                    </div>
                    <p className="roadmap-desc">{roadmapItem.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Economic Feasibility Callout */}
        <div className="feasibility-box" style={{ marginTop: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', color: 'var(--amber)' }}>
              <DollarSign size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                Economic Feasibility & Cost Architecture
              </div>
              <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                Validated Prototype Unit Cost: <strong>{PROJECT_INFO.buildCostTarget}</strong> (BOM Optimization).
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', maxWidth: '28rem' }}>
            Note: Prototype build cost represents raw BOM expenditure. Product kit prices (₹15,000 GPS / ₹14,000 Standard) include pre-assembled carrier drop mounts, tested Teensy firmware, and ground receiver hardware.
          </div>
        </div>
      </div>
    </section>
  );
};
