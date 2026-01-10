// llmNode.js

import { Handle, Position } from 'reactflow';
import { Abstractnode } from './nodeabstract';

export const LLMNode = ({ id, data }) => {

  const handle=[
    { type:"target",
        id:`${id}-system`,
        style:{top: `${100/3}%`},
      },
    { type:"target",
        id:`${id}-propmt`,
        style:{top: `${200/3}%`}
      },
          { type:"source",
        id:`${id}-response`,
        style:{top: `${100/3}%`}},
    ]
    const node={
      name:"LLM",
      type:"LLM",
      description:"This is a LLM.",

    }
  return (
    <Abstractnode handle={handle} node={node}>
    <div >



    </div>
    </Abstractnode>
  );
}
