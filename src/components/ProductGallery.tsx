import React from 'react';
import { Maximize2, ShieldCheck, Cpu } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { GALLERY_ITEMS } from '../data/mission';

interface ProductGalleryProps {
  onOpenLightbox: (id: string) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ onOpenLightbox }) => {
  return (
    <section id="hardware" className="gallery-section" aria-labelledby="hardware-gallery-title">
      <div className="container">
        <SectionHeading
          id="hardware-gallery-title"
          eyebrow="Physical Prototype & CAD Reference"
          title="Hardware & Carrier Platform Gallery"
          subtitle="Direct comparison between the airborne CanSat sensing payload and the quadcopter launch carrier vehicle."
        />

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item) => {
            const isActual = item.type === 'actual';

            return (
              <div key={item.id} className="gallery-card">
                {/* Clean Top Bar ABOVE Image to prevent obscuring diagram titles */}
                <div className="gallery-card-top-bar">
                  <span className={`badge ${isActual ? 'badge-green' : 'badge-amber'}`}>
                    {isActual ? <ShieldCheck size={13} /> : <Cpu size={13} />}
                    <span>{item.badge}</span>
                  </span>
                  <span className="badge" style={{ fontSize: '0.68rem', color: 'var(--text-subtle)' }}>
                    {item.entity === 'cansat' ? 'CanSat Payload' : 'Carrier Platform'}
                  </span>
                </div>

                {/* Image Container with Zoom Affordance — completely unobstructed */}
                <div
                  className="gallery-image-box"
                  onClick={() => onOpenLightbox(item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onOpenLightbox(item.id)}
                  aria-label={`Open high-resolution view of ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-image"
                    loading="lazy"
                  />

                  {/* Zoom Button at bottom corner */}
                  <button
                    type="button"
                    className="gallery-zoom-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox(item.id);
                    }}
                  >
                    <Maximize2 size={13} />
                    <span>Expand Callouts</span>
                  </button>
                </div>

                {/* Details */}
                <div className="gallery-info">
                  <h3 className="gallery-title">{item.title}</h3>
                  <p className="gallery-caption">{item.caption}</p>

                  <div className="gallery-callouts">
                    {item.annotations.slice(0, 5).map((annotation, idx) => (
                      <span key={idx} className="callout-pill">
                        {annotation}
                      </span>
                    ))}
                    {item.annotations.length > 5 && (
                      <span className="callout-pill" style={{ color: 'var(--blue-bright)' }}>
                        +{item.annotations.length - 5} more
                      </span>
                    )}
                  </div>

                  {item.dimensions && (
                    <div className="gallery-dim-row">
                      <strong>Chassis Envelope:</strong> {item.dimensions}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
