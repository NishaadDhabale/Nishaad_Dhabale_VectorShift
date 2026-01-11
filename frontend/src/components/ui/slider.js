
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Slider = () => {
  const tabs = ['Workflow', 'Analytics', 'Settings'];
  const [activeTab, setActiveTab] = useState('Workflow');

  return (
<>

        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                relative px-5 py-1 text-sm font-medium transition-colors duration-200 rounded-lg
                ${isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}
              `}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          );
        })}

</>
  );
};