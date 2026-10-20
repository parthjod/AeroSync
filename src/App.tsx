import React, { useState } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatStrip } from './components/StatStrip';
import { ProblemSolution } from './components/ProblemSolution';
import { SectionHeading } from './components/SectionHeading';
import { ProductCard } from './components/ProductCard';
import { HowItWorks } from './components/HowItWorks';
import { ProductGallery } from './components/ProductGallery';
import { TechnicalSpecs } from './components/TechnicalSpecs';
import { MissionTimeline } from './components/MissionTimeline';
import { ImpactGrid } from './components/ImpactGrid';
import { Roadmap } from './components/Roadmap';
import { ResearchReferences } from './components/ResearchReferences';
import { PurchaseSection } from './components/PurchaseSection';
import { PurchaseModal } from './components/PurchaseModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/products';
import { GALLERY_ITEMS } from './data/mission';
import { Product } from './types/product';
import { ConfirmedOrder } from './types/order';

export const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [lightboxActiveItemId, setLightboxActiveItemId] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleOpenOrder = () => {
    setIsPurchaseModalOpen(true);
  };

  const handleClosePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
  };

  const handleOpenLightbox = (itemId: string) => {
    setLightboxActiveItemId(itemId);
  };

  const handleCloseLightbox = () => {
    setLightboxActiveItemId(null);
  };

  const handleOrderSuccess = (order: ConfirmedOrder) => {
    setConfirmedOrder(order);
  };

  const handleCloseSuccessModal = () => {
    setConfirmedOrder(null);
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWorkflow = () => {
    const el = document.getElementById('workflow');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* 1. Ambient Background Video with Accessibility Fallback */}
      <BackgroundVideo />

      {/* 2. Sticky Navbar */}
      <Navbar onOrderClick={handleOpenOrder} />

      {/* 3. Main Content Landmark */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero
          onExploreProducts={scrollToProducts}
          onExploreWorkflow={scrollToWorkflow}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* System Stat & Metric Strip */}
        <StatStrip />

        {/* Problem vs AeroSync Solution (Slide 2) */}
        <ProblemSolution />

        {/* Product Variants Section */}
        <section id="products" className="products-section" aria-labelledby="products-title">
          <div className="container">
            <SectionHeading
              id="products-title"
              eyebrow="Airborne Hardware Offerings"
              title="AeroSync Hardware Variants"
              subtitle="Select between our full-navigation GPS flagship or dedicated atmospheric multi-domain telemetry payload."
            />

            <div className="products-grid">
              {PRODUCTS.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  isSelected={selectedProduct.id === prod.id}
                  onSelectProduct={handleSelectProduct}
                  onOpenLightbox={handleOpenLightbox}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works & Telemetry Pipeline */}
        <HowItWorks />

        {/* Hardware Gallery (CanSat & Carrier Drone) */}
        <ProductGallery onOpenLightbox={handleOpenLightbox} />

        {/* Technical Architecture & Specs */}
        <TechnicalSpecs />

        {/* Mission Timeline & Simulated Telemetry Charts */}
        <MissionTimeline />

        {/* Real-World Use Cases & Impact */}
        <ImpactGrid />

        {/* Risks, Mitigations & Roadmap */}
        <Roadmap />

        {/* Research References */}
        <ResearchReferences />

        {/* Purchase & Enquiry Section */}
        <PurchaseSection
          selectedProduct={selectedProduct}
          onSelectProduct={handleSelectProduct}
          onOrderSuccess={handleOrderSuccess}
        />
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Lightbox Modal for Hardware Images */}
      <ImageLightboxModal
        items={GALLERY_ITEMS}
        activeItemId={lightboxActiveItemId}
        onClose={handleCloseLightbox}
        onSelectItemId={setLightboxActiveItemId}
      />

      {/* 6. Purchase / Enquiry Modal */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        selectedProduct={selectedProduct}
        onSelectProduct={handleSelectProduct}
        onClose={handleClosePurchaseModal}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* 7. Order Confirmation Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={handleCloseSuccessModal}
      />
    </div>
  );
};

export default App;
