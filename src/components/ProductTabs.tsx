import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { ProductSpec } from '../types/product';

interface ProductTabsProps {
  activeTab: 'features' | 'specs' | 'outputs';
  onTabChange: (tab: 'features' | 'specs' | 'outputs') => void;
  features: string[];
  specs: ProductSpec[];
  outputs: string[];
}

export const ProductTabs: React.FC<ProductTabsProps> = ({
  activeTab,
  onTabChange,
  features,
  specs,
  outputs,
}) => {
  return (
    <div>
      {/* Tab Buttons */}
      <div className="product-tabs-header" role="tablist" aria-label="Product Information Tabs">
        <button
          type="button"
          role="tab"
          id={`tab-features`}
          aria-selected={activeTab === 'features'}
          className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
          onClick={() => onTabChange('features')}
        >
          Features ({features.length})
        </button>

        <button
          type="button"
          role="tab"
          id={`tab-specs`}
          aria-selected={activeTab === 'specs'}
          className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
          onClick={() => onTabChange('specs')}
        >
          Specs ({specs.length})
        </button>

        <button
          type="button"
          role="tab"
          id={`tab-outputs`}
          aria-selected={activeTab === 'outputs'}
          className={`tab-btn ${activeTab === 'outputs' ? 'active' : ''}`}
          onClick={() => onTabChange('outputs')}
        >
          Outputs ({outputs.length})
        </button>
      </div>

      {/* Tab Panels */}
      <div className="tab-panel" role="tabpanel">
        {activeTab === 'features' && (
          <ul className="features-list">
            {features.map((feature, idx) => (
              <li key={idx} className="feature-item">
                <CheckCircle2 size={16} className="feature-check-icon" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'specs' && (
          <table className="spec-table">
            <tbody>
              {specs.map((item, idx) => (
                <tr key={idx}>
                  <td className="spec-lbl">{item.label}</td>
                  <td className="spec-val">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'outputs' && (
          <ul className="outputs-list">
            {outputs.map((output, idx) => (
              <li key={idx} className="output-item">
                <ChevronRight size={15} color="var(--blue-bright)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                <span>{output}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
