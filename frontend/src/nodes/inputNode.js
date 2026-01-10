// inputNode.js

import { useState } from 'react';
import { Abstractnode } from './nodeabstract';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const node = {
    id: id,
    name: 'Input ',
    type: 'input',
    description: 'Name: ',
    data: {
      inputName: currName,
      inputType: inputType,
    },
  };

  const handle = [
    {
      type: 'source',
      style: {},
      id: `${id}-value`,
    },
  ];
  const inputprop = {
    type: 'text',
    currName: currName,
    handleNameChange: handleNameChange,
  };
  const typeprop = {
    inputType: inputType,
    handleTypeChange: handleTypeChange,
    option: [
      { type: 'Text', name: 'Text' },
      { type: 'File', name: 'File' },
    ],
  };
  return (
    <Abstractnode
      handle={handle}
      node={node}
      inputprop={inputprop}
      typeprop={typeprop}
    >
      <div className=""></div>
    </Abstractnode>
  );
};
