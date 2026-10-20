import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { RESEARCH_REFERENCES } from '../data/mission';

export const ResearchReferences: React.FC = () => {
  return (
    <section className="references-section" aria-labelledby="references-title">
      <div className="container">
        <SectionHeading
          id="references-title"
          eyebrow="Slide 08 · Academic Foundation"
          title="Research & Literature References"
          subtitle="Foundational pico-satellite literature and published atmospheric sensing benchmarks cited in the project dossier."
        />

        <div className="references-grid">
          {RESEARCH_REFERENCES.map((ref) => (
            <a
              key={ref.id}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="reference-card"
            >
              <div className="ref-index">0{ref.id}</div>
              <div className="ref-content">
                <h4 className="ref-title">{ref.title}</h4>
                <div className="ref-source">
                  <BookOpen size={14} />
                  <span>{ref.source}</span>
                  <ExternalLink size={13} style={{ marginLeft: 'auto' }} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
