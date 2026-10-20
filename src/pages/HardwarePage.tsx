import React from 'react';
import { ProductGallery } from '../components/ProductGallery';

interface HardwarePageProps {
  onOpenLightbox: (id: string) => void;
}

export const HardwarePage: React.FC<HardwarePageProps> = ({ onOpenLightbox }) => {
  return (
    <div className="page-wrapper">
      <ProductGallery onOpenLightbox={onOpenLightbox} />
    </div>
  );
};
