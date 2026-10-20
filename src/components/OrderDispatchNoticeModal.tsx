import React, { useEffect } from 'react';
import { Rocket, Radio, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { ConfirmedOrder } from '../types/order';

interface OrderDispatchNoticeModalProps {
  order: ConfirmedOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDispatchNoticeModal: React.FC<OrderDispatchNoticeModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  if (!isOpen || !order) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dispatch-notice-title"
      onClick={onClose}
    >
      <div
        className="modal-dialog"
        style={{
          maxWidth: '560px',
          border: '1px solid rgba(96, 165, 250, 0.4)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(59, 130, 246, 0.3)',
          background: 'linear-gradient(180deg, #0f172a 0%, #071120 100%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with animated beacon */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid rgba(96, 165, 250, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#60a5fa',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
              }}
            >
              <Rocket size={24} />
            </div>
            <div>
              <span className="badge badge-green" style={{ fontSize: '0.68rem', marginBottom: '0.2rem' }}>
                <CheckCircle2 size={12} />
                <span>TELEMETRY NODE LOCKED</span>
              </span>
              <h3 id="dispatch-notice-title" className="modal-title" style={{ fontSize: '1.25rem' }}>
                Mission Order Dispatched!
              </h3>
            </div>
          </div>

          <button
            type="button"
            className="lightbox-close-btn"
            onClick={onClose}
            aria-label="Close dispatch notice"
          >
            <X size={20} />
          </button>
        </div>

        {/* Witty Aerospace Announcement */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem', lineHeight: 1.5 }}>
            Transmission Acknowledged, Chief! 🛰️
          </p>

          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>
            Your hardware allocation for <strong style={{ color: '#60a5fa' }}>{order.productName}</strong> is
            locked into the active <strong style={{ color: '#f59e0b' }}>VAYU9 Ground Control (Team 0007)</strong> launch
            registry under Order Ref <strong style={{ color: '#ffffff', fontFamily: 'var(--font-mono)' }}>{order.orderId}</strong>.
          </p>

          <div
            style={{
              padding: '1rem',
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.82rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6ee7b7', fontWeight: 600 }}>
              <Radio size={16} />
              <span>Avionics Ground Crew Status: Bench-Testing In Progress</span>
            </div>
            <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Our engineering team is flashing your Teensy 4.1 flight computer core and calibrating the 433 MHz LoRa transceiver.
              We'll buzz your mobile frequency (<strong style={{ color: '#ffffff' }}>+91 {order.phone}</strong>) within 24 hours to
              coordinate dispatch logistics and test telemetry downlinks.
            </p>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.8rem', fontStyle: 'italic', margin: 0 }}>
            Keep your ground receiver on standby and your radio link tuned — we're taking atmospheric sensing to new altitudes!
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '0.85rem',
            fontSize: '0.95rem',
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            boxShadow: '0 4px 18px rgba(37, 99, 235, 0.4)',
          }}
          onClick={onClose}
        >
          <Sparkles size={18} />
          <span>Roger That Ground Control · Standing By 🚀</span>
        </button>
      </div>
    </div>
  );
};
