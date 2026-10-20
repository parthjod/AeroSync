import { CreateOrderPayload, ConfirmedOrder, OrderServiceResponse } from '../types/order';
import { getSupabaseClient, isSupabaseConfigured } from './supabase';

/**
 * Generate a unique, readable order reference:
 * e.g. AEROSYNC-M7Q9L2-8K2F
 */
export function generateOrderId(): string {
  const timestampPart = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AEROSYNC-${timestampPart}-${randomPart}`;
}

/**
 * Submits an order enquiry/purchase to Supabase orders table.
 * If Supabase is not configured, provides a clear error or optional preview mode.
 */
export async function submitOrder(
  payload: CreateOrderPayload,
  allowLocalSimulationIfUnconfigured = false
): Promise<OrderServiceResponse> {
  const orderId = generateOrderId();
  const nowIso = new Date().toISOString();

  // 1. Check if Supabase credentials are wired up
  if (!isSupabaseConfigured()) {
    if (allowLocalSimulationIfUnconfigured) {
      // Allow testing the full UI confirmation flow when env is not yet set
      const simulatedOrder: ConfirmedOrder = {
        orderId,
        name: payload.name.trim(),
        phone: payload.phone.trim(),
        productName: payload.productName,
        price: payload.price,
        createdAt: nowIso,
        isSimulated: true,
      };
      return {
        success: true,
        order: simulatedOrder,
      };
    }

    return {
      success: false,
      needsConfig: true,
      error:
        'Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file and create the orders table using supabase_schema.sql.',
    };
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      success: false,
      error: 'Supabase client failed to initialize. Please check your configuration.',
    };
  }

  try {
    const { error } = await supabase.from('orders').insert([
      {
        order_id: orderId,
        name: payload.name.trim(),
        phone: payload.phone.trim(),
        product: payload.productName,
        price: payload.price,
        created_at: nowIso,
      },
    ]);

    if (error) {
      console.error('Supabase orders insert error:', error);
      return {
        success: false,
        error: error.message || 'Failed to save order to database.',
      };
    }

    const confirmedOrder: ConfirmedOrder = {
      orderId,
      name: payload.name.trim(),
      phone: payload.phone.trim(),
      productName: payload.productName,
      price: payload.price,
      createdAt: nowIso,
      isSimulated: false,
    };

    return {
      success: true,
      order: confirmedOrder,
    };
  } catch (err: unknown) {
    console.error('Unexpected error during order submission:', err);
    const message = err instanceof Error ? err.message : 'A network error occurred while submitting your order.';
    return {
      success: false,
      error: message,
    };
  }
}
