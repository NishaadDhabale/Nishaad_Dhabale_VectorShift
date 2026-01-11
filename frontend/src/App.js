import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { GraphAnalysisCard } from './components/submitcard';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading,setLoading]=useState(false);
  const[response,setResponse]=useState();
  return (
    <div>
      <AnimatePresence>
        {isModalOpen && (
          <GraphAnalysisCard response={response} loading={loading} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton setLoading={setLoading} setResponse={setResponse} setModal={setIsModalOpen} />
    </div>
  );
}

export default App;
