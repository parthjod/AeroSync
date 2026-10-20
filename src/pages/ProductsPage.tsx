import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { Product } from '../types/product';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';

interface ProductsPageProps {
  selectedProduct: Product;
  onSelectProduct: (product: Product) => void;
  onOpenLightbox: (id: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  selectedProduct,
  onSelectProduct,
  onOpenLightbox,
}) => {
  const navigate = useNavigate();

  const handleProductSelect = (product: Product) => {
    onSelectProduct(product);
    navigate('/order');
  };

  return (
    <div style={{ padding: 'var(--section-space) 0' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Airborne Hardware Offerings"
          title="AeroSync Hardware Variants"
          subtitle="Two pre-calibrated payload architectures engineered for atmospheric research, telemetry education, and field drops."
        />

        {/* Product Cards Grid */}
        <div className="products-grid">
          {PRODUCTS.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              isSelected={selectedProduct.id === prod.id}
              onSelectProduct={handleProductSelect}
              onOpenLightbox={onOpenLightbox}
            />
          ))}
        </div>

        {/* Variant Comparison Matrix */}
        <div className="specs-table-box" style={{ maxWidth: '980px', margin: '0 auto', padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem', fontWeight: 700 }}>
            Quick Architectural Comparison
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Both platforms share the same high-speed 600 MHz Teensy 4.1 processor, dual temperature cross-validation, and LoRa transceiver.
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table className="specs-data-table">
              <thead>
                <tr>
                  <th>Subsystem / Sensor</th>
                  <th>AeroSync GPS (₹15,000 FLAGSHIP)</th>
                  <th>AeroSync Standard (₹14,000 CORE)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, color: '#ffffff' }}>GNSS Navigation</td>
                  <td style={{ color: 'var(--green)' }}>
                    <CheckCircle2 size={15} style={{ display: 'inline', marginRight: '5px' }} />
                    u-blox NEO-6M (Position, Altitude, Speed, HDOP)
                  </td>
                  <td style={{ color: 'var(--text-subtle)' }}>Not included (Dedicated Atmospheric)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#ffffff' }}>Flight Computer</td>
                  <td>Teensy 4.1 (600 MHz ARM Cortex-M7)</td>
                  <td>Teensy 4.1 (600 MHz ARM Cortex-M7)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#ffffff' }}>Atmospheric Pressure</td>
                  <td>Bosch BME280 (300–1100 hPa)</td>
                  <td>Bosch BME280 (300–1100 hPa)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#ffffff' }}>Dual Temp & Humidity Cross-Check</td>
                  <td>BME280 + Sensirion SHT31 (±0.2°C / ±2% RH)</td>
                  <td>BME280 + Sensirion SHT31 (±0.2°C / ±2% RH)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#ffffff' }}>Solar / Ambient Light</td>
                  <td>Vishay VEML6030 (16-bit up to 120k lx)</td>
                  <td>Vishay VEML6030 (16-bit up to 120k lx)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#ffffff' }}>9-DOF Inertial Motion</td>
                  <td>ST LSM9DS1 (Accel, Gyro, Magnetometer)</td>
                  <td>ST LSM9DS1 (Accel, Gyro, Magnetometer)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#ffffff' }}>LoRa Telemetry Frequency</td>
                  <td>433 MHz (AS32-TTL-100 TX / E32-433T30D RX)</td>
                  <td>433 MHz (AS32-TTL-100 TX / E32-433T30D RX)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#ffffff' }}>Ground Software Support</td>
                  <td>Mission Planner 3D Map + CSV Logs</td>
                  <td>CSV Telemetry Logger + Terminal Plotter</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              className="btn btn-primary"
              style={{ padding: '0.85rem 2rem' }}
              onClick={() => navigate('/order')}
            >
              <ShoppingCart size={18} />
              <span>Proceed to Reserve Your Platform (Selected: {selectedProduct.name})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
