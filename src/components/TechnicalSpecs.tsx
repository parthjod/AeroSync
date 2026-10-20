import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { TECHNICAL_SPECS_TABLES } from '../data/mission';

export const TechnicalSpecs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hardware' | 'comms' | 'dimensions'>('hardware');

  return (
    <section id="specs" className="specs-section" aria-labelledby="specs-title">
      <div className="container">
        <SectionHeading
          id="specs-title"
          eyebrow="Architectural Breakdown"
          title="Technical Specifications & Avionics"
          subtitle="Detailed hardware component ratings, communication link budgets, and prototype physical parameters."
        />

        {/* Tab Controls */}
        <div className="specs-tabs-bar" role="tablist" aria-label="Specification Categories">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'hardware'}
            className={`specs-tab-btn ${activeTab === 'hardware' ? 'active' : ''}`}
            onClick={() => setActiveTab('hardware')}
          >
            Flight Avionics & Sensors ({TECHNICAL_SPECS_TABLES.flightHardware.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'comms'}
            className={`specs-tab-btn ${activeTab === 'comms' ? 'active' : ''}`}
            onClick={() => setActiveTab('comms')}
          >
            RF Downlink & Software ({TECHNICAL_SPECS_TABLES.commsSoftware.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'dimensions'}
            className={`specs-tab-btn ${activeTab === 'dimensions' ? 'active' : ''}`}
            onClick={() => setActiveTab('dimensions')}
          >
            Enclosure & Performance ({TECHNICAL_SPECS_TABLES.physicalSpecs.length})
          </button>
        </div>

        {/* Table Box */}
        <div className="specs-table-box" role="tabpanel">
          {activeTab === 'hardware' && (
            <div style={{ overflowX: 'auto' }}>
              <table className="specs-data-table">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Subsystem Role</th>
                    <th>Operational Specification & Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {TECHNICAL_SPECS_TABLES.flightHardware.map((row, idx) => (
                    <tr key={idx}>
                      <td><span className="mono-tag">{row.component}</span></td>
                      <td style={{ color: '#ffffff', fontWeight: 600 }}>{row.role}</td>
                      <td>{row.spec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'comms' && (
            <div style={{ overflowX: 'auto' }}>
              <table className="specs-data-table">
                <thead>
                  <tr>
                    <th>Module / Tool</th>
                    <th>Subsystem Function</th>
                    <th>Protocol & Operational Parameters</th>
                  </tr>
                </thead>
                <tbody>
                  {TECHNICAL_SPECS_TABLES.commsSoftware.map((row, idx) => (
                    <tr key={idx}>
                      <td><span className="mono-tag">{row.component}</span></td>
                      <td style={{ color: '#ffffff', fontWeight: 600 }}>{row.role}</td>
                      <td>{row.spec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'dimensions' && (
            <div style={{ overflowX: 'auto' }}>
              <table className="specs-data-table">
                <thead>
                  <tr>
                    <th>Prototype Dimension / Metric</th>
                    <th>Engineering Value & Verification Status</th>
                  </tr>
                </thead>
                <tbody>
                  {TECHNICAL_SPECS_TABLES.physicalSpecs.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ color: '#ffffff', fontWeight: 600 }}>{row.parameter}</td>
                      <td>
                        <span className="mono-tag">{row.value}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
