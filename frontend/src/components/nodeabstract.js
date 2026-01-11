// nodeabstract.js

import { Handle, Position } from 'reactflow';
import { motion } from 'motion/react';

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
        className="p-6  bg-white/60  backdrop-blur-xl  rounded-[28px] border border-white/40 shadow-xl shadow-slate-200/50 hover:shadow-indigo-500/10 transition-all duration-300 "
      >
        <div>
          <span>{node && node.name}</span>
        </div>

        <div>
          {node && node.description}
          <div>
            {inputprop ? (
              <label>
                <input
                  type={inputprop.type}
                  value={inputprop.currName}
                  onChange={inputprop.handleNameChange}
                />
              </label>
            ) : null}
          </div>
        </div>

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

        <div>{children}</div>
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
