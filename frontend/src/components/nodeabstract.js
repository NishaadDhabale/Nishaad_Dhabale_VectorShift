// nodeabstract.js

import { Handle, Position } from 'reactflow';
import { motion } from 'motion/react';
import Input from './ui/text';

export const Abstractnode = ({
  handle,
  node,
  children,
  inputprop,
  typeprop,
}) => {
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
        {handle?.map((h) => (
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
