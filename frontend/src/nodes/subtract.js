import { useState } from 'react';
import { Abstractnode } from '../components/nodeabstract';

export const Subtract = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customSubtract-', 'subtract_')
  );

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const node = {
    id: id,
    name: 'Subtract',
    type: 'subtract',
    description: 'Subtract: ',
    data: {
      inputName: currName,
    },
  };

  const handle = [
    {
      type: 'target',
      style: { top: `${200 / 3}%` },
      id: `${id}-product1`,
    },
    {
      type: 'target',
      style: { top: `${100 / 3}%` },
      id: `${id}-product2`,
    },
    {
      type: 'source',
      style: { top: `${100 / 3}%` },
      id: `${id}-solution`,
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
