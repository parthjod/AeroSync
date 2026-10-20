import React from 'react';

export const StatStrip: React.FC = () => {
  return (
    <section className="stat-strip-section" aria-label="Key System Targets">
      <div className="container">
        <div className="stat-grid">
          {/* Stat 1 */}
          <div className="stat-card">
            <div className="stat-value">
              9 <span className="stat-unit">Channels</span>
            </div>
            <div className="stat-label">Synchronized Sensing</div>
            <div className="stat-footnote">BME280, SHT31, VEML6030, LSM9DS1, GPS</div>
          </div>

          {/* Stat 2 */}
          <div className="stat-card">
            <div className="stat-value">
              &gt;95<span className="stat-unit">%</span>
            </div>
            <div className="stat-label">Packet Delivery</div>
            <div className="stat-footnote">Reported target over direct line-of-sight</div>
          </div>

          {/* Stat 3 */}
          <div className="stat-card">
            <div className="stat-value">
              ~2.0<span className="stat-unit">s</span>
            </div>
            <div className="stat-label">Telemetry Interval</div>
            <div className="stat-footnote">Deterministic RF downlink cycle</div>
          </div>

          {/* Stat 4 */}
          <div className="stat-card">
            <div className="stat-value">
              433 <span className="stat-unit">MHz</span>
            </div>
            <div className="stat-label">LoRa Telemetry Link</div>
            <div className="stat-footnote">AS32-TTL-100 TX / E32-433T30D RX</div>
          </div>
        </div>
      </div>
    </section>
  );
};
