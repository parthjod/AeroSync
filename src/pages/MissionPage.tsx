import React from 'react';
import { MissionTimeline } from '../components/MissionTimeline';

export const MissionPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      <MissionTimeline />
    </div>
  );
};
