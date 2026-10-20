import React, { useState, useEffect } from 'react';
import { CheckCircle2, Copy, Check, X, ShieldCheck, AlertCircle } from 'lucide-react';
import { ConfirmedOrder } from '../types/order';

interface OrderSuccessModalProps {
  order: ConfirmedOrder | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!order) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [order, onClose]);

  if (!order) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      onClick={onClose}
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ color: 'var(--green)' }}>
              <CheckCircle2 size={26} />
            </div>
            <div>
              <h3 id="success-modal-title" className="modal-title">
                {order.isSimulated ? 'Order Enquiry Simulated' : 'Order Enquiry Confirmed'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {order.isSimulated
                  ? 'Local test mode · Database credentials pending in .env'
                  : 'Successfully recorded in Supabase orders database'}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="lightbox-close-btn"
            onClick={onClose}
            aria-label="Close confirmation dialog"
          >
            <X size={20} />
          </button>
        </div>

        {order.isSimulated && (
          <div className="config-alert-box" style={{ margin: 0 }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <div>
              <strong>Demonstration Mode:</strong> This order was generated locally for UI testing.
              To enable live database persistence, add your Supabase credentials to <code>.env</code>.
            </div>
          </div>
        )}

        {/* Order ID Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
            UNIQUE ORDER REFERENCE ID
          </label>
          <div className="order-id-display">
            <span>{order.orderId}</span>
            <button
              type="button"
              className="copy-btn"
              onClick={handleCopy}
              aria-label="Copy order reference ID to clipboard"
              title="Copy ID"
            >
              {copied ? <Check size={16} color="var(--green)" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Receipt Details */}
        <div className="receipt-box">
          <div className="receipt-row">
            <span className="receipt-lbl">Customer Name</span>
            <span className="receipt-val">{order.name}</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-lbl">Contact Mobile</span>
            <span className="receipt-val">
              +91 {order.phone.slice(0, 5)} {order.phone.slice(5)}
            </span>
          </div>

          <div className="receipt-row">
            <span className="receipt-lbl">Selected Payload</span>
            <span className="receipt-val" style={{ color: 'var(--blue-bright)' }}>
              {order.productName}
            </span>
          </div>

          <div className="receipt-row" style={{ borderTop: '1px solid rgba(148, 163, 184, 0.1)', paddingTop: '0.5rem' }}>
            <span className="receipt-lbl" style={{ fontWeight: 600, color: '#ffffff' }}>Total Amount</span>
            <span className="receipt-val" style={{ color: 'var(--amber)', fontSize: '1.15rem' }}>
              ₹{order.price.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="receipt-row">
            <span className="receipt-lbl">Timestamp</span>
            <span className="receipt-val" style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
              {new Date(order.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </span>
          </div>
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ShieldCheck size={15} color="var(--green)" />
          <span>VAYU9 Team ID 0007 will contact this number for hardware dispatch details.</span>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onClose}
        >
          <span>Done & Close</span>
        </button>
      </div>
    </div>
  );
};
