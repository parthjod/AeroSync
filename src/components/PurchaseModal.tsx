import React, { useState, useEffect, useRef } from 'react';
import { X, ShoppingCart, Loader2, ShieldCheck, Database, AlertCircle } from 'lucide-react';
import { Product } from '../types/product';
import { ConfirmedOrder } from '../types/order';
import { validateOrderForm, ValidationErrors } from '../lib/validation';
import { submitOrder } from '../lib/orderService';
import { isSupabaseConfigured } from '../lib/supabase';
import { PRODUCTS } from '../data/products';

interface PurchaseModalProps {
  isOpen: boolean;
  selectedProduct: Product;
  onSelectProduct: (product: Product) => void;
  onClose: () => void;
  onOrderSuccess: (order: ConfirmedOrder) => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  selectedProduct,
  onSelectProduct,
  onClose,
  onOrderSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const supabaseConfigured = isSupabaseConfigured();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only accept numeric digits and cap at exactly 10 digits
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(digitsOnly);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    // Focus first input
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);

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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    const validation = validateOrderForm(name, phone);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await submitOrder(
        {
          name: name.trim(),
          phone: validation.normalizedPhone,
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          price: selectedProduct.price,
        },
        !supabaseConfigured // allow local simulation if env is not yet configured
      );

      if (response.success && response.order) {
        onClose();
        onOrderSuccess(response.order);
        setName('');
        setPhone('');
      } else {
        setSubmissionError(response.error || 'Failed to submit order.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred during submission.';
      setSubmissionError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="purchase-modal-title"
      onClick={onClose}
    >
      <div
        className="modal-dialog"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <span className="badge badge-amber" style={{ fontSize: '0.68rem', marginBottom: '0.25rem' }}>
              TEAM VAYU9 · ID 0007
            </span>
            <h3 id="purchase-modal-title" className="modal-title">
              Order / Enquire Hardware
            </h3>
          </div>

          <button
            type="button"
            className="lightbox-close-btn"
            onClick={onClose}
            aria-label="Close order dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Product Variant Toggle */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {PRODUCTS.map((p) => {
            const isSelected = p.id === selectedProduct.id;
            return (
              <button
                key={p.id}
                type="button"
                className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.6rem 0.75rem', fontSize: '0.8rem', flexDirection: 'column', gap: '0.2rem' }}
                onClick={() => onSelectProduct(p)}
              >
                <span>{p.name}</span>
                <span style={{ fontSize: '0.72rem', opacity: 0.9 }}>
                  ₹{p.price.toLocaleString('en-IN')}
                </span>
              </button>
            );
          })}
        </div>

        {!supabaseConfigured && (
          <div className="config-alert-box" style={{ margin: 0, padding: '0.65rem 0.85rem' }}>
            <Database size={17} style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.76rem' }}>
              Supabase credentials not detected in <code>.env</code>. Order will run in local test demo mode.
            </div>
          </div>
        )}

        {submissionError && (
          <div className="config-alert-box" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#fca5a5', margin: 0 }}>
            <AlertCircle size={17} style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.78rem' }}>{submissionError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="modal-name" className="form-label">
              Full Name <span style={{ color: 'var(--red)' }}>*</span>
            </label>
            <input
              ref={firstInputRef}
              id="modal-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Parth Sharma"
              className={`form-input ${errors.name ? 'has-error' : ''}`}
              disabled={isSubmitting}
              required
            />
            {errors.name && <span className="form-error-msg">{errors.name}</span>}
          </div>

          {/* Mobile Phone */}
          <div className="form-group">
            <label htmlFor="modal-phone" className="form-label">
              10-Digit Indian Mobile Number <span style={{ color: 'var(--red)' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)', fontSize: '0.9rem', fontWeight: 600 }}>
                +91
              </span>
              <input
                id="modal-phone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="9876543210"
                className={`form-input ${errors.phone ? 'has-error' : ''}`}
                style={{ paddingLeft: '3.25rem' }}
                disabled={isSubmitting}
                maxLength={10}
                required
              />
            </div>
            {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.74rem', color: 'var(--text-subtle)', marginBottom: '1.25rem' }}>
            <ShieldCheck size={14} color="var(--green)" />
            <span>Strict privacy assurance · Team ID 0007 direct verification</span>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Submitting Enquiry...</span>
              </>
            ) : (
              <>
                <ShoppingCart size={18} />
                <span>
                  Submit Order Enquiry (₹{selectedProduct.price.toLocaleString('en-IN')})
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
