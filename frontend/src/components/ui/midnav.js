import { motion } from 'motion/react';
import { Search } from 'lucide-react';

export const MidNav = ({ nav, selected, setSelected }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search Nodes"
            className="h-9 w-44 rounded-lg border pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-1">
          {Object.keys(nav).map((tab, i) => (
            <motion.button
              onClick={() => {
                setSelected(tab);
              }}
              key={tab + i}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              layout
              className={`rounded-lg px-3 py-1.5 text-sm transition ${
                selected === tab
                  ? 'bg-gray-100 text-primary'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
