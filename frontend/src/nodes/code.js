import { useState } from 'react';
import { Abstractnode } from '../components/nodeabstract';

export const Code = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customCode-', 'code_')
  );

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const node = {
    id: id,
    name: 'Code',
    type: 'code',
    description: 'Code:: ',
    data: {
      inputName: currName,
    },
  };

  const handle = [
    {
      type: 'target',
      style: {},
      id: `${id}-variable`,
    },
    {
      type: 'source',
      style: { top: `${100 / 3}%` },
      id: `${id}-outcome`,
    },
  ];
  const inputprop = {
    type: 'text',
    currName: currName,
    handleNameChange: handleNameChange,
  };

  return (
    <Abstractnode handle={handle} node={node} inputprop={inputprop}>
      <div></div>
    </Abstractnode>
  );
};
