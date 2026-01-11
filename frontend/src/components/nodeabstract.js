// nodeabstract.js

import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { motion } from 'motion/react';
import Input from './ui/text';
import { useEffect, useMemo } from 'react';

export const Abstractnode = ({
  handle,
  node,
  children,
  inputprop,
  typeprop,
}) => {
  const variableRegex = /\{\{\s*([a-zA-Z_$\-][a-zA-Z0-9_$\-]*)\s*\}\}/g;
  const dynamicHandles = useMemo(() => {
    const text = inputprop?.currName || inputprop?.currText || '';
    const matches = [...text.matchAll(variableRegex)];
    const variables = [...new Set(matches.map((match) => match[1]))];

    return variables.map((varName, index) => ({
      type: 'target',
      id: `${node.id}-${varName}`,

      style: { top: `${(index + 1) * (100 / (variables.length + 1))}%` },
    }));
  }, [inputprop?.currName, inputprop?.currText, node.id]);

  const allHandles = useMemo(() => {
    return [...(handle || []), ...dynamicHandles];
  }, [handle, dynamicHandles]);

  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(node.id);
  }, [node.id, allHandles, updateNodeInternals]);

  const autoConnect = (currentNodeId, text, nodes, edges) => {
    const matches = [...text.matchAll(variableRegex)];
    const variableNames = [...new Set(matches.map((m) => m[1]))];

    const newEdges = variableNames
      .map((varName) => {
        // Check if a node with this ID exists
        const sourceNodeExists = nodes.some((n) => n.id === varName);
        // Check if the edge already exists to avoid infinite loops
        const edgeExists = edges.some(
          (e) => e.source === varName && e.target === currentNodeId
        );
        if (sourceNodeExists && !edgeExists) {
          return {
            id: `auto-${varName}-${currentNodeId}`,
            source: varName, // The variable name is the ID of the source node
            target: currentNodeId,
            targetHandle: `${currentNodeId}-${varName}`, // ID of the handle you created in Abstractnode
            type: 'smoothstep', // Or your preferred edge type
            animated: true,
          };
        }
        return null;
      })
      .filter(Boolean); // Remove nulls (where node doesn't exist or edge already there)
    return newEdges;
  };

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
                <Input
                  dynamicHeight
                  type={inputprop.type}
                  value={inputprop.currName}
                  onChange={inputprop.handleNameChange}
                ></Input>
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
