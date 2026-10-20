import React, { useState } from 'react';
import { Table, LineChart, AlertTriangle } from 'lucide-react';
import { SIMULATED_MISSION_DATA, SimulatedDataPoint } from '../data/mission';

export const MissionCharts: React.FC = () => {
  const [showDataTable, setShowDataTable] = useState(false);

  // SVG Chart Dimensions & Helpers
  const width = 500;
  const height = 180;
  const padding = { top: 20, right: 30, bottom: 30, left: 45 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Max values for scaling
  const maxTime = 120; // seconds
  const maxAltitude = 350; // meters
  const minTemp = 25; // °C
  const maxTemp = 30; // °C

  // Generate SVG path for Altitude
  const altitudePoints = SIMULATED_MISSION_DATA.map((d: SimulatedDataPoint) => {
    const x = padding.left + (d.time / maxTime) * chartWidth;
    const y = padding.top + chartHeight - (d.altitude / maxAltitude) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  // Generate SVG path for Temperature
  const tempPoints = SIMULATED_MISSION_DATA.map((d: SimulatedDataPoint) => {
    const x = padding.left + (d.time / maxTime) * chartWidth;
    const y = padding.top + chartHeight - ((d.temperature - minTemp) / (maxTemp - minTemp)) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{ marginTop: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            Simulated Mission Telemetry Profiles
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Illustrative flight profile matching the curves presented in Slide 05 of the project deck.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
          onClick={() => setShowDataTable(!showDataTable)}
          aria-expanded={showDataTable}
        >
          {showDataTable ? <LineChart size={15} /> : <Table size={15} />}
          <span>{showDataTable ? 'Show Graphical Charts' : 'View Raw Data Points'}</span>
        </button>
      </div>

      {!showDataTable ? (
        <div className="charts-grid">
          {/* Chart 1: Altitude vs Time */}
          <div className="chart-card">
            <div className="chart-card-header">
              <span className="chart-title">Altitude Profile vs Mission Elapsed Time</span>
              <span className="chart-disclaimer">
                <AlertTriangle size={12} style={{ display: 'inline', marginRight: '3px' }} />
                Simulated Telemetry — Illustrative Only
              </span>
            </div>

            <div className="chart-svg-box">
              <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg" aria-label="Altitude profile chart">
                {/* Grid Lines */}
                {[0, 100, 200, 300].map((alt) => {
                  const y = padding.top + chartHeight - (alt / maxAltitude) * chartHeight;
                  return (
                    <g key={alt}>
                      <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="rgba(148, 163, 184, 0.15)" strokeDasharray="3,3" />
                      <text x={padding.left - 8} y={y + 4} fill="#64748b" fontSize="10" textAnchor="end">{alt}m</text>
                    </g>
                  );
                })}

                {/* Time Axis Labels */}
                {[0, 30, 60, 90, 120].map((t) => {
                  const x = padding.left + (t / maxTime) * chartWidth;
                  return (
                    <g key={t}>
                      <line x1={x} y1={padding.top} x2={x} y2={height - padding.bottom} stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="2,2" />
                      <text x={x} y={height - padding.bottom + 16} fill="#64748b" fontSize="10" textAnchor="middle">{t}s</text>
                    </g>
                  );
                })}

                {/* Altitude Curve */}
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={altitudePoints}
                />

                {/* Data Points */}
                {SIMULATED_MISSION_DATA.map((d: SimulatedDataPoint, i: number) => {
                  const x = padding.left + (d.time / maxTime) * chartWidth;
                  const y = padding.top + chartHeight - (d.altitude / maxAltitude) * chartHeight;
                  return (
                    <circle key={i} cx={x} cy={y} r="3" fill="#60a5fa" stroke="#020b18" strokeWidth="1.5" />
                  );
                })}

                {/* Apogee Label at 50s */}
                <text x={padding.left + (50 / maxTime) * chartWidth} y={padding.top + 8} fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">
                  Apogee (~310m)
                </text>
              </svg>
            </div>

            <div className="chart-legend">
              <div>
                <span className="legend-dot" style={{ backgroundColor: '#3b82f6' }} />
                <span>Barometric Altitude (MSL in meters)</span>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
                Target Apogee: 300m AGL
              </div>
            </div>
          </div>

          {/* Chart 2: Temperature vs Time */}
          <div className="chart-card">
            <div className="chart-card-header">
              <span className="chart-title">Atmospheric Temperature vs Descent Phase</span>
              <span className="chart-disclaimer">
                <AlertTriangle size={12} style={{ display: 'inline', marginRight: '3px' }} />
                Simulated Telemetry — Illustrative Only
              </span>
            </div>

            <div className="chart-svg-box">
              <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg" aria-label="Temperature profile chart">
                {/* Grid Lines */}
                {[26, 27, 28, 29].map((temp) => {
                  const y = padding.top + chartHeight - ((temp - minTemp) / (maxTemp - minTemp)) * chartHeight;
                  return (
                    <g key={temp}>
                      <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="rgba(148, 163, 184, 0.15)" strokeDasharray="3,3" />
                      <text x={padding.left - 8} y={y + 4} fill="#64748b" fontSize="10" textAnchor="end">{temp}°C</text>
                    </g>
                  );
                })}

                {/* Time Axis Labels */}
                {[0, 30, 60, 90, 120].map((t) => {
                  const x = padding.left + (t / maxTime) * chartWidth;
                  return (
                    <g key={t}>
                      <line x1={x} y1={padding.top} x2={x} y2={height - padding.bottom} stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="2,2" />
                      <text x={x} y={height - padding.bottom + 16} fill="#64748b" fontSize="10" textAnchor="middle">{t}s</text>
                    </g>
                  );
                })}

                {/* Temperature Curve */}
                <polyline
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={tempPoints}
                />

                {/* Data Points */}
                {SIMULATED_MISSION_DATA.map((d: SimulatedDataPoint, i: number) => {
                  const x = padding.left + (d.time / maxTime) * chartWidth;
                  const y = padding.top + chartHeight - ((d.temperature - minTemp) / (maxTemp - minTemp)) * chartHeight;
                  return (
                    <circle key={i} cx={x} cy={y} r="3" fill="#f87171" stroke="#020b18" strokeWidth="1.5" />
                  );
                })}

                {/* Lapse rate note */}
                <text x={width - padding.right} y={padding.top + 8} fill="#fca5a5" fontSize="10" textAnchor="end">
                  Thermal Lapse Gradient
                </text>
              </svg>
            </div>

            <div className="chart-legend">
              <div>
                <span className="legend-dot" style={{ backgroundColor: '#ef4444' }} />
                <span>Ambient Temperature (BME280 / SHT31 in °C)</span>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
                Cross-Checked with SHT31
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Accessible Data Table */
        <div className="specs-table-box" style={{ marginBottom: '1.5rem' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="specs-data-table">
              <thead>
                <tr>
                  <th>MET (Seconds)</th>
                  <th>Altitude (m)</th>
                  <th>Temperature (°C)</th>
                  <th>Pressure (hPa)</th>
                  <th>Humidity (% RH)</th>
                  <th>Illumination (Lux)</th>
                </tr>
              </thead>
              <tbody>
                {SIMULATED_MISSION_DATA.map((row: SimulatedDataPoint, idx: number) => (
                  <tr key={idx}>
                    <td><span className="mono-tag">{row.time}s</span></td>
                    <td>{row.altitude} m</td>
                    <td style={{ color: '#fca5a5' }}>{row.temperature}°C</td>
                    <td>{row.pressure} hPa</td>
                    <td>{row.humidity}%</td>
                    <td>{row.lux.toLocaleString()} lx</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
