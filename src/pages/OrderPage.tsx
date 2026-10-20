import React from 'react';
import { PurchaseSection } from '../components/PurchaseSection';
import { Product } from '../types/product';
import { ConfirmedOrder } from '../types/order';

interface OrderPageProps {
  selectedProduct: Product;
  onSelectProduct: (product: Product) => void;
  onOrderSuccess: (order: ConfirmedOrder) => void;
}

export const OrderPage: React.FC<OrderPageProps> = ({
  selectedProduct,
  onSelectProduct,
  onOrderSuccess,
}) => {
  return (
    <div style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      <PurchaseSection
        selectedProduct={selectedProduct}
        onSelectProduct={onSelectProduct}
        onOrderSuccess={onOrderSuccess}
      />
    </div>
  );
};
