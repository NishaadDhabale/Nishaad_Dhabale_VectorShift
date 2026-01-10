// nodeabstract.js

import { Handle, Position } from 'reactflow';

//Maybe make this an wrapper component
export const Abstractnode = ({
  handle,
  node,
  children,
  inputprop,
  typeprop,
}) => {
  return (
    <div
      className="shadow-lg bg-white w-50 h-48 p-5 shadow-black rounded-2xl"
      style={{ border: '1px solid black' }}
    >
      <div>
        {handle?.map((h) => (
          <Handle
            type="target"
            key={h.id}
            position={h.type === 'target' ? Position.Right : Position.Left}
            id={h.id}
            style={{ height: '10px', width: '10px', ...h.style }}
          />
        ))}
      </div>

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
                <option value={o.type}>{o.name}</option>
              ))}
            </select>
          </label>
        </div>
      ) : null}

      <div>{children}</div>
    </div>
  );
};
