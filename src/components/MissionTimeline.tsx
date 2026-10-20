import React from 'react';
import { SectionHeading } from './SectionHeading';
import { MissionCharts } from './MissionCharts';
import { MISSION_TIMELINE } from '../data/mission';

export const MissionTimeline: React.FC = () => {
  return (
    <section id="mission" className="mission-section" aria-labelledby="mission-title">
      <div className="container">
        <SectionHeading
          id="mission-title"
          eyebrow="Flight Profile Sequence"
          title="Mission Timeline & Telemetry Simulation"
          subtitle="Four-phase operational lifecycle from ground staging to parachute-stabilized descent and ground station logging."
        />

        {/* 4 Phase Timeline Cards */}
        <div className="timeline-track">
          {MISSION_TIMELINE.map((item, idx) => (
            <div key={idx} className="timeline-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="timeline-phase-tag">{item.phase}</span>
                <span className="badge badge-blue">{item.badge}</span>
              </div>

              <h3 className="timeline-name">{item.name}</h3>
              <p className="timeline-desc">{item.desc}</p>

              <div className="timeline-metrics">{item.metrics}</div>
            </div>
          ))}
        </div>

        {/* Charts & Graphs */}
        <MissionCharts />
      </div>
    </section>
  );
};
