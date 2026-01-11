// nodeabstract.js

import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { motion } from 'motion/react';
import Input from './ui/text';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onConnect: state.onConnect,
});

const getSourceHandleId = (node) => {
  if (!node) return null;
  switch (node.type) {
    case 'customInput':
    case 'input':
      return `${node.id}-value`;
    case 'llm':
    case 'LLM':
      return `${node.id}-response`;
    case 'text':
      return `${node.id}-output`;
    case 'multiply':
    case 'subtract':
      return `${node.id}-value`;
    case 'code':
      // CHANGE: Was '-output', must be '-outcome' to match code.js
      return `${node.id}-outcome`;
    case 'video':
    case 'Video transcript':
      // CHANGE: Was '-response', must be '-transcribbed' to match videotranscript.js
      return `${node.id}-transcribbed`;
    case 'condition':
    case 'conditionnode':
       // CHANGE: Default to 'else'. Condition nodes are tricky because they have two.
      return `${node.id}-else`;
    default:
      return `${node.id}-output`;
  }
};

export const Abstractnode = ({
  handle,
  node,
  children,
  inputprop,
  typeprop,
}) => {
  const { nodes, edges, onConnect } = useStore(selector, shallow);
  const [showOptions, setShowOptions] = useState(false);
  const [cursorPos, setCursorPos] = useState(0);
  const updateNodeInternals = useUpdateNodeInternals();

  const currValue = inputprop?.currName ?? inputprop?.currText ?? '';
  const handleChange =
    inputprop?.handleNameChange ?? inputprop?.handleTextChange;

  const variableRegex = /\{\{\s*([a-zA-Z_$\-][a-zA-Z0-9_$\-]*)\s*\}\}/g;

  const dynamicHandles = useMemo(() => {
    const text = currValue;
    const matches = [...text.matchAll(variableRegex)];
    const variables = [...new Set(matches.map((match) => match[1]))];

    return variables.map((varName, index) => ({
      type: 'target',
      id: `${node.id}-${varName}`,
      style: { top: `${(index + 1) * (100 / (variables.length + 1))}%` },
    }));
  }, [currValue, node.id]);

  const allHandles = useMemo(() => {
    return [...(handle || []), ...dynamicHandles];
  }, [handle, dynamicHandles]);

  useEffect(() => {
    updateNodeInternals(node.id);
  }, [node.id, allHandles, updateNodeInternals]);

  useEffect(() => {
    if (!currValue) return;

    const matches = [...currValue.matchAll(variableRegex)];
    const tokens = [...new Set(matches.map((m) => m[1]))];

 const timer = setTimeout(() => {
      tokens.forEach((token) => {
        const sourceNode = nodes.find((n) => {
           const defaultHandle = getSourceHandleId(n);
           return defaultHandle === token || n.id === token || (n.data && n.data.id === token);
        });

        if (sourceNode) {
          const defaultSourceHandle = getSourceHandleId(sourceNode);
          const effectiveSourceHandle = (token === sourceNode.id) ? defaultSourceHandle : token;

          const targetHandle = `${node.id}-${token}`;

          const edgeExists = edges.some(
            (e) =>
              e.target === node.id &&
              e.targetHandle === targetHandle &&
              e.source === sourceNode.id &&
              e.sourceHandle === effectiveSourceHandle
          );

          if (!edgeExists) {
            onConnect({
              source: sourceNode.id,
              sourceHandle: effectiveSourceHandle,
              target: node.id,
              targetHandle: targetHandle,
            });
          }
        }
      });
    }, 100); // Wait 100ms for handles to render

    // NEW: Clean up timeout to prevent memory leaks
    return () => clearTimeout(timer);
  }, [currValue, nodes, edges, node.id, onConnect]);

  
  const handleInputChange = (e) => {
    const val = e.target.value;
    const newCursorPos = e.target.selectionStart;
    setCursorPos(newCursorPos);

    // Call the parent's change handler
    if (handleChange) handleChange(e);

    // Simple trigger: if we just typed "{{", show options
    const textBeforeCursor = val.slice(0, newCursorPos);
    if (textBeforeCursor.endsWith('{{')) {
      setShowOptions(true);
    } else if (!val.includes('{{')) {
      setShowOptions(false);
    }
  };

const insertVariable = (valueToInsert) => {
    const textBefore = currValue.slice(0, cursorPos);
    const lastOpenBrace = textBefore.lastIndexOf('{{');

    let newValue;
    if (lastOpenBrace !== -1) {
      // Replace text from '{{' to cursor with '{{HandleID}}'
      newValue =
        currValue.slice(0, lastOpenBrace) +
        `{{${valueToInsert}}}` +
        currValue.slice(cursorPos);
    } else {
      newValue = currValue + `{{${valueToInsert}}}`;
    }

    const fakeEvent = { target: { value: newValue } };
    if (handleChange) handleChange(fakeEvent);

    setShowOptions(false);
  };

const availableOptions = nodes
    .filter((n) => n.id !== node.id)
    .flatMap((n) => {
      const handleId = getSourceHandleId(n);

      // Special check for condition nodes to show both options
      if (n.type === 'condition' || n.type === 'conditionnode') {
        return [
          { id: `${n.id}-else`, label: `${n.id} (Else)`, nodeId: n.id },
          { id: `${n.id}-else-if`, label: `${n.id} (Else If)`, nodeId: n.id }
        ];
      }

      return [{
        id: handleId,
        label: handleId,
        nodeId: n.id
      }];
    })
    .filter(opt => opt.id);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.9, y: 0 }}
        whileHover={{ transition: { duration: 0.2 } }}
        className="p-3  bg-white/60  backdrop-blur-xl min-w-48 rounded-[28px] border border-white/40 shadow-xl shadow-slate-200/50 hover:shadow-indigo-500/10 transition-all duration-300 "
      >
        <div className="max-w-md rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-100">
                <span className="text-sm font-semibold">
                  {node.icon ? node.icon : '|>'}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {node.name}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              <button className="hover:text-gray-700">⟳</button>
              <button className="hover:text-gray-700">⚙</button>
            </div>
          </div>
          <div className="mt-3 rounded-md bg-gray-100 px-3 py-1.5 text-center text-sm text-gray-600">
            {node.id}
          </div>
          <div>
            {node && node.description}
            <div>
              {inputprop ? (
                <>
                  <Input
                    dynamicHeight
                    type={inputprop.type}
                    value={currValue}
                    onChange={handleInputChange}
                    onClick={() => setShowOptions(false)}
                  ></Input>

                  {showOptions && (
                    <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      <div className="px-2 py-1 text-xs font-semibold text-gray-400 bg-gray-50">
                        Available Nodes
                      </div>
                      {availableOptions.length > 0 ? (
                        availableOptions.map((opt) => (
                          <div
                            key={opt.id}
                            className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                            onClick={() => insertVariable(opt.id)}
                          >
                            {opt.label}
                          </div>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-sm text-gray-400 italic">
                          No handles found
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
          <div>{children}</div>
          {typeprop ? (
            <div>
              <label>
                Type:
                <select
                  value={typeprop.inputType}
                  onChange={typeprop.handleTypeChange}
                >
                  {typeprop.option?.map((o) => (
                    <option key={o.name} value={o.type}>
                      {o.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ) : null}
        </div>
      </motion.div>
      <div>
        {allHandles?.map((h) => (
          <Handle
            type={h.type}
            key={h.id}
            position={h.type === 'target' ? Position.Left : Position.Right}
            id={h.id}
            className="p-1"
            style={h.style}
          />
        ))}
      </div>
    </div>
  );
};
