import React from 'react';
import { Activity, Cpu, Radio, Wifi, Laptop, FileSpreadsheet, ArrowRight } from 'lucide-react';
import { TELEMETRY_PIPELINE } from '../data/mission';

const ICON_MAP: Record<string, React.ReactNode> = {
  Activity: <Activity size={20} />,
  Cpu: <Cpu size={20} />,
  Radio: <Radio size={20} />,
  Wifi: <Wifi size={20} />,
  Laptop: <Laptop size={20} />,
  FileSpreadsheet: <FileSpreadsheet size={20} />
};

export const TelemetryPipeline: React.FC = () => {
  return (
    <div className="pipeline-box">
      <div className="pipeline-header">
        <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>
          Data Transmission Architecture
        </span>
        <h3 style={{ fontSize: '1.35rem' }}>End-to-End Airborne Telemetry Pipeline</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Continuous sensor-to-ground downlink operating over 433 MHz LoRa at ~2.0-second intervals.
        </p>
      </div>

      <div className="pipeline-flow">
        {TELEMETRY_PIPELINE.map((node, idx) => (
          <React.Fragment key={idx}>
            <div className="pipeline-node">
              <div className="node-icon-box">
                {ICON_MAP[node.icon] || <Activity size={20} />}
              </div>
              <span className="node-name">{node.label}</span>
              <span className="node-desc">{node.detail}</span>
            </div>

            {idx < TELEMETRY_PIPELINE.length - 1 && (
              <div className="pipeline-arrow" aria-hidden="true">
                <ArrowRight size={20} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
