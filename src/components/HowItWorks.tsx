import React from 'react';
import { Power, Cpu, Radio, Monitor } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { TelemetryPipeline } from './TelemetryPipeline';
import { WORKFLOW_STEPS } from '../data/mission';

const ICON_MAP: Record<string, React.ReactNode> = {
  Power: <Power size={22} />,
  Cpu: <Cpu size={22} />,
  Radio: <Radio size={22} />,
  Monitor: <Monitor size={22} />
};

export const HowItWorks: React.FC = () => {
  return (
    <section id="workflow" className="workflow-section" aria-labelledby="workflow-title">
      <div className="container">
        <SectionHeading
          id="workflow-title"
          eyebrow="Mission Execution"
          title="How AeroSync Operates"
          subtitle="A deterministic four-phase sequence from ground pre-flight checks to live LoRa telemetry decoding."
        />

        {/* 4-Step Cards */}
        <div className="workflow-grid">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div key={idx} className="workflow-card">
              <div className="workflow-card-top">
                <span className="step-num-badge">{step.step}</span>
                <div className="step-icon-box">
                  {ICON_MAP[step.icon] || <Cpu size={22} />}
                </div>
              </div>

              <div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-summary">{step.summary}</p>
              </div>

              <ul className="step-bullets">
                {step.details.map((detail, bulletIdx) => (
                  <li key={bulletIdx} className="step-bullet-item">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Telemetry Pipeline Flowchart */}
        <TelemetryPipeline />
      </div>
    </section>
  );
};
