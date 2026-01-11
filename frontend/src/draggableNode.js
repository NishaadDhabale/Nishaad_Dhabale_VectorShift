// draggableNode.js
import { motion } from 'motion/react';
export const DraggableNode = ({ type, label, disabled }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <motion.div
      key={label}
              onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      whileHover={!disabled ? { y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`${type} group flex items-center justify-center rounded-xl border px-4 py-2 text-sm shadow-sm transition ${
        disabled
          ? 'cursor-not-allowed bg-muted text-muted-foreground'
          : 'bg-white hover:bg-muted'
      }`}
        draggable
    >

        <span>{label}</span>

    </motion.div>
  );
};
