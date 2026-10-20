import React, { useState } from 'react';
import { Maximize2, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types/product';
import { ProductTabs } from './ProductTabs';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelectProduct: (product: Product) => void;
  onOpenLightbox: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onSelectProduct,
  onOpenLightbox,
}) => {
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'outputs'>('features');

  const badgeClass = product.badge === 'FLAGSHIP' ? 'badge-blue' : 'badge-violet';

  return (
    <article
      className={`product-card ${isSelected ? 'selected' : ''}`}
      aria-labelledby={`product-title-${product.id}`}
    >
      <div className="product-card-header">
        <div className="product-badge-row">
          <span className={`badge ${badgeClass}`}>{product.badge}</span>
          <span className="badge" style={{ fontSize: '0.7rem' }}>
            {product.id === 'aerosync-gps' ? 'GPS + Navigation' : 'Dedicated Atmospheric'}
          </span>
        </div>

        <h3 id={`product-title-${product.id}`} className="product-title">
          {product.name}
        </h3>
        <p className="product-subtitle">{product.subtitle}</p>

        <div className="product-price-box">
          <span className="product-price-currency">₹</span>
          <span className="product-price">{product.price.toLocaleString('en-IN')}</span>
          <span className="product-price-sub">/ unit prototype kit</span>
        </div>
      </div>

      {/* Product Image with Lightbox Zoom Affordance */}
      <div
        className="product-img-box"
        onClick={() => onOpenLightbox(product.id === 'aerosync-gps' ? 'cansat-actual' : 'cansat-annotated')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onOpenLightbox(product.id === 'aerosync-gps' ? 'cansat-actual' : 'cansat-annotated');
          }
        }}
        aria-label={`View enlarged hardware diagram for ${product.name}`}
      >
        <img
          src={product.image}
          alt={`AeroSync hardware enclosure - ${product.name}`}
          className="product-img"
          loading="lazy"
        />
        <div className="expand-overlay-hint">
          <Maximize2 size={13} />
          <span>Click to Inspect Callouts</span>
        </div>
      </div>

      {/* Key Highlight Banner */}
      <div className="product-highlight-banner">
        <strong>Key Feature:</strong> {product.highlight}
      </div>

      {/* Interactive Tabs */}
      <ProductTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        features={product.features}
        specs={product.specs}
        outputs={product.outputs}
      />

      {/* Card Action Footer */}
      <div className="product-card-footer">
        <button
          type="button"
          className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
          style={{ width: '100%' }}
          onClick={() => onSelectProduct(product)}
        >
          {isSelected ? (
            <>
              <Check size={18} />
              <span>Selected for Order · Proceed Below</span>
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              <span>Select {product.name} (₹{product.price.toLocaleString('en-IN')})</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
