// outputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Abstractnode } from './nodeabstract';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const node = {
    name: 'Output',
    type: 'Output',
    description: 'Name:',
  };
  const inputprops = {
    type: 'text',
    currName: currName,
    handleNameChange: handleNameChange,
  };
  const typeprops = {
    outputType: outputType,
    handleTypeChange: handleTypeChange,
    option: [
      { type: 'Text', name: 'Text' },
      { type: 'File', name: 'File' },
    ],
  };
  const handle = [
    {
      type: 'target',
      id: `${id}-value`,
    },
  ];
  return (
    <Abstractnode
      node={node}
      handle={handle}
      inputprop={inputprops}
      typeprop={typeprops}
    >
      <div></div>
    </Abstractnode>
  );
};
