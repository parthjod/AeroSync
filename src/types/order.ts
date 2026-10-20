export interface OrderFormValues {
  name: string;
  phone: string;
}

export interface CreateOrderPayload {
  name: string;
  phone: string;
  productId: 'aerosync-gps' | 'aerosync-standard';
  productName: string;
  price: number;
}

export interface ConfirmedOrder {
  orderId: string;
  name: string;
  phone: string;
  productName: string;
  price: number;
  createdAt: string;
  isSimulated?: boolean;
}

export interface OrderServiceResponse {
  success: boolean;
  order?: ConfirmedOrder;
  error?: string;
  needsConfig?: boolean;
}
