import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { GraphAnalysisCard } from './components/submitcard';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <AnimatePresence>
        {isModalOpen && (
          <GraphAnalysisCard onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton setModal={setIsModalOpen} />
    </div>
  );
}

export default App;
