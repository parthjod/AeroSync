import React, { useState } from 'react';
import { ShoppingCart, ShieldCheck, AlertCircle, Loader2, Database } from 'lucide-react';
import { Product } from '../types/product';
import { ConfirmedOrder } from '../types/order';
import { validateOrderForm, ValidationErrors } from '../lib/validation';
import { submitOrder } from '../lib/orderService';
import { isSupabaseConfigured } from '../lib/supabase';
import { PRODUCTS } from '../data/products';

interface PurchaseSectionProps {
  selectedProduct: Product;
  onSelectProduct: (product: Product) => void;
  onOrderSuccess: (order: ConfirmedOrder) => void;
}

export const PurchaseSection: React.FC<PurchaseSectionProps> = ({
  selectedProduct,
  onSelectProduct,
  onOrderSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const supabaseConfigured = isSupabaseConfigured();

  const handleSubmit = async (e: React.FormEvent, isTestSimulation = false) => {
    e.preventDefault();
    setSubmissionError(null);

    // Validate inputs
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
        isTestSimulation || !supabaseConfigured // allow local preview if test or unconfigured
      );

      if (response.success && response.order) {
        onOrderSuccess(response.order);
        setName('');
        setPhone('');
      } else {
        setSubmissionError(response.error || 'Failed to submit order enquiry.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setSubmissionError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order" className="purchase-section" aria-labelledby="purchase-heading">
      <div className="container">
        <div className="purchase-card-wrapper">
          <div className="purchase-grid">
            {/* Left Col: Product Selection & Pricing */}
            <div className="purchase-info-col">
              <span className="badge badge-amber" style={{ alignSelf: 'flex-start' }}>
                Prototype Hardware Order & Enquiry
              </span>

              <h2 id="purchase-heading" className="purchase-heading">
                Reserve Your AeroSync Platform
              </h2>

              <p className="purchase-desc">
                Select your preferred CanSat hardware kit. Fill in your details below for verification
                and dispatch coordination by Team VAYU9 (Team ID 0007).
              </p>

              {/* Product Selector Radios */}
              <div className="purchase-product-selector">
                <label style={{ fontSize: '0.84rem', color: '#e2e8f0', fontWeight: 600 }}>
                  Choose Hardware Variant:
                </label>

                {PRODUCTS.map((prod) => {
                  const isActive = selectedProduct.id === prod.id;
                  return (
                    <div
                      key={prod.id}
                      className={`product-select-option ${isActive ? 'active' : ''}`}
                      onClick={() => onSelectProduct(prod)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && onSelectProduct(prod)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <input
                          type="radio"
                          name="productVariant"
                          checked={isActive}
                          onChange={() => onSelectProduct(prod)}
                          aria-label={prod.name}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>
                            {prod.name}
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-subtle)' }}>
                            {prod.subtitle}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--amber)', fontSize: '1.1rem' }}>
                          ₹{prod.price.toLocaleString('en-IN')}
                        </div>
                        <span className="badge" style={{ fontSize: '0.65rem' }}>
                          {prod.badge}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Hardware Summary Box */}
              <div style={{ background: '#020914', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Selected Kit: <strong style={{ color: '#ffffff' }}>{selectedProduct.name}</strong>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--blue-bright)', marginTop: '0.25rem' }}>
                  Includes: {selectedProduct.highlight}
                </div>
              </div>
            </div>

            {/* Right Col: Order Form */}
            <div>
              {/* Configuration Status Notice */}
              {!supabaseConfigured && (
                <div className="config-alert-box">
                  <Database size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Database Credentials Pending in .env:</strong>
                    <p style={{ marginTop: '0.2rem', fontSize: '0.78rem', lineHeight: 1.45 }}>
                      <code>VITE_SUPABASE_URL</code> or <code>VITE_SUPABASE_ANON_KEY</code> is not yet configured.
                      You can test the full UI submission flow below using <strong>Test Demo Order</strong>, or add keys to <code>.env</code> for live persistence.
                    </p>
                  </div>
                </div>
              )}

              {submissionError && (
                <div className="config-alert-box" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#fca5a5' }}>
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <div>{submissionError}</div>
                </div>
              )}

              <form onSubmit={(e) => handleSubmit(e, !supabaseConfigured)} noValidate>
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="customer-name" className="form-label">
                    Full Name <span style={{ color: 'var(--red)' }}>*</span>
                  </label>
                  <input
                    id="customer-name"
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

                {/* Mobile Number */}
                <div className="form-group">
                  <label htmlFor="customer-phone" className="form-label">
                    10-Digit Indian Mobile Number <span style={{ color: 'var(--red)' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)', fontSize: '0.9rem', fontWeight: 600 }}>
                      +91
                    </span>
                    <input
                      id="customer-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className={`form-input ${errors.phone ? 'has-error' : ''}`}
                      style={{ paddingLeft: '3.25rem' }}
                      disabled={isSubmitting}
                      maxLength={14}
                      required
                    />
                  </div>
                  {errors.phone ? (
                    <span className="form-error-msg">{errors.phone}</span>
                  ) : (
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-subtle)' }}>
                      Used strictly for prototype enquiry verification and dispatch updates.
                    </span>
                  )}
                </div>

                {/* Privacy Assurance */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.74rem', color: 'var(--text-subtle)', marginBottom: '1.25rem' }}>
                  <ShieldCheck size={14} color="var(--green)" />
                  <span>Privacy Notice: Your information is never shared or logged in browser consoles.</span>
                </div>

                {/* Submit Action */}
                <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.85rem' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Processing Order Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        <span>
                          {supabaseConfigured
                            ? `Confirm & Save Order (₹${selectedProduct.price.toLocaleString('en-IN')})`
                            : `Test Demo Order (₹${selectedProduct.price.toLocaleString('en-IN')})`}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
