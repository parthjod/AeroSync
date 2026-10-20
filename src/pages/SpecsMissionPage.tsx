import React from 'react';
import { TechnicalSpecs } from '../components/TechnicalSpecs';
import { MissionTimeline } from '../components/MissionTimeline';

export const SpecsMissionPage: React.FC = () => {
  return (
    <div className="page-wrapper specs-mission-page">
      {/* 1. Complete Flight Avionics, Sensors & RF Architecture */}
      <TechnicalSpecs />

      {/* 2. Visual Investor Divider */}
      <div className="container" style={{ margin: '0.5rem auto' }}>
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, var(--border-strong) 50%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* 3. Operational 4-Phase Flight Sequence & Telemetry Dynamics */}
      <MissionTimeline />
    </div>
  );
};

export default SpecsMissionPage;
