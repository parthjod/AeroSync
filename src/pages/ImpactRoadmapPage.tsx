import React from 'react';
import { ImpactGrid } from '../components/ImpactGrid';
import { Roadmap } from '../components/Roadmap';
import { ResearchReferences } from '../components/ResearchReferences';

export const ImpactRoadmapPage: React.FC = () => {
  return (
    <div className="page-wrapper impact-roadmap-page">
      {/* 1. Market Applications & Multi-Domain Impact */}
      <ImpactGrid />

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

      {/* 3. Risk Mitigation Matrix, Milestones & Unit Cost Economics */}
      <Roadmap />

      {/* 4. Peer-Reviewed Academic & Literature Validation */}
      <ResearchReferences />
    </div>
  );
};

export default ImpactRoadmapPage;
