import { motion } from 'motion/react';
import { Play, Save, Share2, Code2, X } from 'lucide-react';
import { Slider } from './slider.js';
import { useStore } from '../../store.js';

export const TopNav = () => {
  const deleteAllNodes = useStore((state) => state.deleteAllNodes);
  return (
    <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground p-1 border-b-2">
      <div>
        <span className="font-medium text-foreground">Projects</span> / New
        Project 1 /{' '}
        <span className="font-medium text-foreground">New Workflow</span>
      </div>

      <div className="bg-slate-50 ">
        <Slider />
      </div>
      <div className="flex items-center gap-2">
        {/* Icons */}
        {[Code2, X].map((Icon, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={deleteAllNodes}
            className="flex h-8 w-8 items-center justify-center rounded-lg border hover:bg-muted"
          >
            <Icon className="h-4 w-4" />
          </motion.button>
        ))}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1 rounded-lg border px-2 py-1.5 text-sm hover:bg-muted"
        >
          <Share2 className="h-4 w-4" />
          Share
        </motion.button>

        {/* Run */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1 rounded-lg bg-green-500 px-3 py-1.5 text-sm text-white hover:bg-green-600"
        >
          <Play className="h-4 w-4" />
          Run
        </motion.button>

        {/* Save */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
        >
          <Save className="h-4 w-4" />
          Save
        </motion.button>
      </div>
    </div>
  );
};
