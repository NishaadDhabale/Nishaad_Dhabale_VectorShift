// llmNode.js

import { Abstractnode } from '../components/nodeabstract';


export const LLMNode = ({ id, data }) => {
  const handle = [
    { type: 'target', id: `${id}-system`, style: { top: `${100 / 3}%` } },
    { type: 'target', id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
    { type: 'source', id: `${id}-response`, style: { top: `${100 / 3}%` } },
  ];
  const node = {
    name: 'LLM',
    id: id,
    type: 'LLM',
    description: 'This is a LLM.',
  };
  return (
    <Abstractnode handle={handle} node={node}>
      <div>
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-sm font-medium text-gray-700">
            <span>System </span>
            {handle[2].id}
            <span className="text-gray-400">Prompt</span>
          </div>
        </div>
      </div>
    </Abstractnode>
  );
};
