import React from 'react';
import { ProductGallery } from '../components/ProductGallery';

interface HardwarePageProps {
  onOpenLightbox: (id: string) => void;
}

export const HardwarePage: React.FC<HardwarePageProps> = ({ onOpenLightbox }) => {
  return (
    <div style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      <ProductGallery onOpenLightbox={onOpenLightbox} />
    </div>
  );
};
