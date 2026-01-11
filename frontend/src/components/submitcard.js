import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const GraphAnalysisCard = ({ onClose }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const cardRef = useRef(null);


  const handleReset = () => {
    setShowResult(false);
    setIsAnalyzing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-6">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        delay={0.3}
        onClick={onClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-md cursor-pointer"
      />

      {/* The Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative  group w-full max-w-sm z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-[40px] blur-2xl opacity-50 pointer-events-none" />

        <div className="relative bg-white/70 bg-opacity-100 backdrop-blur-2xl border border-white/40 rounded-[32px] shadow-2xl overflow-hidden transition-all duration-300">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6  space-y-3"
              >
                <div className="flex items-center  justify-between mb-4 px-2">
                  <h3 className="text-lg font-bold text-gray-800">Results</h3>
                  <button
                    onClick={handleReset}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-3 py-1 rounded-full"
                  >
                    Reset
                  </button>
                </div>

                <div className="flex  w-full items-center justify-between mb-4 px-2">
                  <div className=" w-1/2">
                  <div className="flex w-full justify-start gap-16">
                    <h4 className="text-md font-bold text-gray-800">
                      No. Nodes
                    </h4>
                  </div>
                  <div className="flex w-full justify-start gap-16">
                    <h4 className="text-md font-bold text-gray-800">
                      No. Edges
                    </h4>
                  </div>{' '}
                  <div className="flex w-full justify-start gap-16">
                    <h4 className="text-md font-bold text-gray-800">DAG</h4>
                  </div>
                  </div>

                  <div className="w-1/2">
                  <div className="flex w-full justify-start gap-16">
                    <h4 className="text-md font-bold text-gray-800">
                      No. Nodes
                    </h4>
                  </div>
                  <div className="flex w-full justify-start gap-16">
                    <h4 className="text-md font-bold text-gray-800">
                      No. Edges
                    </h4>
                  </div>{' '}
                  <div className="flex w-full justify-start gap-16">
                    <h4 className="text-md font-bold text-gray-800">DAG</h4>
                  </div>
                  </div>
                </div>

                <div className="pt-4 px-2">
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3">
                    <div className="mt-0.5 text-emerald-600">
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.308.533.19 0 .452-.084.685-.187s.454-.31.62-.472L8.465 11.5c-.21.21-.45.313-.715.313-.656 0-1.173-.434-.962-1.408l1.047-4.142c.07-.34-.029-.533-.308-.533-.19 0-.452.084-.685.187s-.454.31-.62.472l.103-.102c.21-.21.45-.313.715-.313.656 0 1.173.434.962 1.408zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                      </svg>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">
                      Analysis complete. The graph is acyclic and ready for
                      topological sort.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
