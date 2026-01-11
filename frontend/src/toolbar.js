// toolbar.js

import { DraggableNode } from './draggableNode';
import React, { useState, useEffect } from 'react';

import { TopNav } from './components/ui/topnav.js';
import { MidNav } from './components/ui/midnav.js';
export const PipelineToolbar = () => {
  const [selected, setSelected] = useState('VectorShift');
  const Nav = {
    Start: {
      options: [
        { label: 'Trigger', type: 'trigger', disabled: true },
        { label: 'Start', type: 'start', disabled: true },
        {
          label: 'Browser Extension',
          type: 'browser extension',
          disabled: true,
        },
      ],
    },
    VectorShift: {
      options: [
        { type: 'customInput', label: 'Input' },
        { type: 'llm', label: 'LLM' },
        { type: 'customOutput', label: 'Output' },
      ],
    },
    Knowledge: {
      options: [
        { type: 'customInput', label: 'Input' },
        { type: 'llm', label: 'LLM' },
        { type: 'customOutput', label: 'Output' },
        { type: 'text', label: 'Text' },
      ],
    },
    AI: {
      options: [{ type: 'llm', label: 'LLM' }],
    },
    Data: {
      options: [{ type: 'text', label: 'Text' }],
    },
    Logic: {
      options: [
        { type: 'condition', label: 'Condition' },
        { type: 'multiply', label: 'Multiply' },
        { type: 'subtract', label: 'Subtract' },
        { type: 'code', label: 'Code' },
        { type: 'video', label: 'Video' },
      ],
    },
  };
  return (
    <div className="w-full border-b bg-white px-4 py-2  shadow-black">
      <TopNav />
      <MidNav nav={Nav} selected={selected} setSelected={setSelected} />

      <div className="mt-3 flex items-center gap-3">
        {Nav[selected].options.map((item) => (
          <DraggableNode
            key={item.type}
            type={item.type}
            disabled={item.disabled}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};
