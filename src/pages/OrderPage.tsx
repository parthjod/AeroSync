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
    <div className="order-page-container page-wrapper">
      <PurchaseSection
        selectedProduct={selectedProduct}
        onSelectProduct={onSelectProduct}
        onOrderSuccess={onOrderSuccess}
      />
    </div>
  );
};
