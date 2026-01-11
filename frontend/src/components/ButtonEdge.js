import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';
import { useStore } from '../store';
import { X } from 'lucide-react'; // Using the icon library present in your package.json

export default function ButtonEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const deleteEdge = useStore((state) => state.deleteEdge);

  // Calculate the path and the center position (labelX, labelY)
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (evt) => {
    evt.stopPropagation();
    deleteEdge(id);
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button
            className="w-5 h-5 bg-gray-200 hover:bg-red-500 hover:text-white rounded-full flex justify-center items-center cursor-pointer border border-gray-300 shadow-sm transition-colors"
            onClick={onEdgeClick}
            aria-label="Delete edge"
          >
            <X size={12} />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
