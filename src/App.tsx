import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { OverviewPage } from './pages/OverviewPage';
import { ProductsPage } from './pages/ProductsPage';
import { WorkflowPage } from './pages/WorkflowPage';
import { HardwarePage } from './pages/HardwarePage';
import { SpecsPage } from './pages/SpecsPage';
import { MissionPage } from './pages/MissionPage';
import { ImpactPage } from './pages/ImpactPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { OrderPage } from './pages/OrderPage';

import { PurchaseModal } from './components/PurchaseModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderDispatchNoticeModal } from './components/OrderDispatchNoticeModal';
import { ImageLightboxModal } from './components/ImageLightboxModal';

import { PRODUCTS } from './data/products';
import { GALLERY_ITEMS } from './data/mission';
import { Product } from './types/product';
import { ConfirmedOrder } from './types/order';

export const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [lightboxActiveItemId, setLightboxActiveItemId] = useState<string | null>(null);

  // Order confirmation states
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [dispatchNoticeOrder, setDispatchNoticeOrder] = useState<ConfirmedOrder | null>(null);
  const [isDispatchNoticeOpen, setIsDispatchNoticeOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle hash redirection from old single-page anchors (e.g. #mission -> /mission)
  useEffect(() => {
    const rawHash = window.location.hash.replace('#', '').toLowerCase();
    if (rawHash) {
      if (rawHash === 'overview') {
        navigate('/', { replace: true });
      } else if (
        ['products', 'workflow', 'hardware', 'specifications', 'specs', 'mission', 'impact', 'roadmap', 'order'].includes(rawHash)
      ) {
        const targetPath = rawHash === 'specs' ? '/specifications' : `/${rawHash}`;
        navigate(targetPath, { replace: true });
      }
    }
  }, [navigate]);

  const handleOpenOrderModal = () => {
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

  // When "Done & Close" is clicked on the receipt, show the lively dispatch notification popup!
  const handleDoneAndCloseSuccessModal = () => {
    if (confirmedOrder) {
      setDispatchNoticeOrder(confirmedOrder);
      setConfirmedOrder(null);
      setIsDispatchNoticeOpen(true);
    } else {
      setConfirmedOrder(null);
    }
  };

  const handleCloseDispatchNotice = () => {
    setIsDispatchNoticeOpen(false);
    setDispatchNoticeOrder(null);
  };

  return (
    <div className="app-container">
      {/* 1. Global Ambient Background Video in Loop */}
      <BackgroundVideo />

      {/* 2. Upgraded Sticky Navbar with Multi-Page Links */}
      <Navbar onOrderClick={handleOpenOrderModal} />

      {/* 3. Main Routed Landmark */}
      <main id="main-content">
        <Routes>
          <Route path="/" element={<OverviewPage onOpenLightbox={handleOpenLightbox} />} />
          <Route path="/overview" element={<Navigate to="/" replace />} />
          <Route
            path="/products"
            element={
              <ProductsPage
                selectedProduct={selectedProduct}
                onSelectProduct={setSelectedProduct}
                onOpenLightbox={handleOpenLightbox}
              />
            }
          />
          <Route path="/workflow" element={<WorkflowPage />} />
          <Route path="/hardware" element={<HardwarePage onOpenLightbox={handleOpenLightbox} />} />
          <Route path="/specifications" element={<SpecsPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route
            path="/order"
            element={
              <OrderPage
                selectedProduct={selectedProduct}
                onSelectProduct={setSelectedProduct}
                onOrderSuccess={handleOrderSuccess}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 4. Global Footer */}
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
        onSelectProduct={setSelectedProduct}
        onClose={handleClosePurchaseModal}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* 7. Order Confirmation Receipt Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={handleCloseSuccessModal}
        onDoneAndClose={handleDoneAndCloseSuccessModal}
      />

      {/* 8. Aerospace Dispatch Confirmation Pop-up (Non-generic, witty confirmation) */}
      <OrderDispatchNoticeModal
        order={dispatchNoticeOrder}
        isOpen={isDispatchNoticeOpen}
        onClose={handleCloseDispatchNotice}
      />
    </div>
  );
};

export default App;
