import React from 'react';
import { Roadmap } from '../components/Roadmap';
import { ResearchReferences } from '../components/ResearchReferences';

export const RoadmapPage: React.FC = () => {
  return (
    <div className="page-wrapper">
      <Roadmap />
      <ResearchReferences />
    </div>
  );
};
