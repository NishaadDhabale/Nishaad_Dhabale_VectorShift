import React, { useState } from 'react';

/**
 * Props:
 * position: "top" | "bottom" | "left" | "right"
 * defaultOpen?: boolean
 */
export default function NodeAppendix({
  position = 'right',
  children,
  defaultOpen = true,
}) {
  const [open, setOpen] = useState(defaultOpen);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className={`absolute ${positionClasses[position]}
       ${
         !open ? 'rounded-full' : 'rounded-xl'
       } bg-white border shadow  text-sm`}
    >
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between cursor-pointer px-4 py-2 border-b"
      >
        {open && (
          <span className="pl-3 font-semibold text-gray-800">Output</span>
        )}
        <span className="text-xs text-gray-500">{open ? '−' : '+'}</span>
      </div>

      {open && (
        <div className="px-4 py-3">
          <div className="w-full">{children}</div>
        </div>
      )}
    </div>
  );
}
