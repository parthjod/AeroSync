import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { GalleryItem } from '../data/mission';

interface ImageLightboxModalProps {
  items: GalleryItem[];
  activeItemId: string | null;
  onClose: () => void;
  onSelectItemId: (id: string) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  items,
  activeItemId,
  onClose,
  onSelectItemId,
}) => {
  const currentIndex = items.findIndex((item) => item.id === activeItemId);
  const currentItem = currentIndex >= 0 ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelectItemId(items[currentIndex - 1].id);
    } else {
      onSelectItemId(items[items.length - 1].id);
    }
  }, [currentIndex, items, onSelectItemId]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onSelectItemId(items[currentIndex + 1].id);
    } else {
      onSelectItemId(items[0].id);
    }
  }, [currentIndex, items, onSelectItemId]);

  // Handle ESC key and arrow keys
  useEffect(() => {
    if (!currentItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [currentItem, onClose, handlePrev, handleNext]);

  if (!currentItem) return null;

  return (
    <div
      className="lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-modal-title"
      onClick={onClose}
    >
      <div
        className="lightbox-dialog"
        onClick={(e) => e.stopPropagation()} // Prevent backdrop close when clicking dialog
      >
        {/* Header */}
        <div className="lightbox-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span
              className={`badge ${currentItem.type === 'actual' ? 'badge-green' : 'badge-amber'}`}
              style={{ fontSize: '0.72rem' }}
            >
              {currentItem.badge}
            </span>
            <h3 id="lightbox-modal-title" className="lightbox-title">
              {currentItem.title}
            </h3>
          </div>

          <button
            type="button"
            className="lightbox-close-btn"
            onClick={onClose}
            aria-label="Close high-resolution hardware viewer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body Image & Nav Buttons */}
        <div className="lightbox-body">
          <button
            type="button"
            className="lightbox-nav-btn lightbox-nav-prev"
            onClick={handlePrev}
            aria-label="Previous hardware photograph"
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="lightbox-img"
          />

          <button
            type="button"
            className="lightbox-nav-btn lightbox-nav-next"
            onClick={handleNext}
            aria-label="Next hardware photograph"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Footer with Captions & Callouts */}
        <div className="lightbox-footer">
          <p style={{ color: '#e2e8f0', lineHeight: 1.5 }}>{currentItem.caption}</p>
          {currentItem.dimensions && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--amber)', fontSize: '0.8rem', fontWeight: 600 }}>
              <Info size={14} />
              <span>Chassis Dimensions: {currentItem.dimensions}</span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
            <span>Item {currentIndex + 1} of {items.length} · Arrow keys to navigate</span>
            <span>Press ESC or click close to exit</span>
          </div>
        </div>
      </div>
    </div>
  );
};
