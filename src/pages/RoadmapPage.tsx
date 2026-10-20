import React from 'react';
import { Roadmap } from '../components/Roadmap';
import { ResearchReferences } from '../components/ResearchReferences';

export const RoadmapPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      <Roadmap />
      <ResearchReferences />
    </div>
  );
};
