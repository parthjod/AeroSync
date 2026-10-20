import React from 'react';
import { Clock, DollarSign, Layers, Compass, AlertCircle, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { PROBLEMS_AND_SOLUTIONS } from '../data/mission';

const ICON_MAP: Record<string, React.ReactNode> = {
  Clock: <Clock size={22} />,
  DollarSign: <DollarSign size={22} />,
  Layers: <Layers size={22} />,
  Compass: <Compass size={22} />
};

export const ProblemSolution: React.FC = () => {
  return (
    <section className="problem-solution-section" aria-labelledby="prob-sol-heading">
      <div className="container">
        <SectionHeading
          id="prob-sol-heading"
          eyebrow="Slide 02 · System Context"
          title="Why AeroSync Was Engineered"
          subtitle="Addressing core limitations in conventional student sounding rockets and stationary atmospheric monitoring."
        />

        <div className="prob-sol-grid">
          {PROBLEMS_AND_SOLUTIONS.map((item, idx) => (
            <div key={idx} className="prob-sol-card">
              <div className="prob-sol-header">
                <div className="prob-sol-icon">
                  {ICON_MAP[item.icon] || <Layers size={22} />}
                </div>
                <div>
                  <span className="badge badge-amber" style={{ fontSize: '0.68rem', marginBottom: '0.2rem' }}>
                    Challenge #{idx + 1}
                  </span>
                  <h3 style={{ fontSize: '1.15rem' }}>{item.problemTitle}</h3>
                </div>
              </div>

              {/* The Problem */}
              <div className="prob-block">
                <div className="prob-title">
                  <AlertCircle size={15} />
                  <span>The Challenge</span>
                </div>
                <p className="prob-text">{item.problemDesc}</p>
              </div>

              {/* The AeroSync Solution */}
              <div className="sol-block">
                <div className="sol-title">
                  <CheckCircle2 size={15} />
                  <span>AeroSync Architecture</span>
                </div>
                <p className="sol-text">{item.solutionDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
