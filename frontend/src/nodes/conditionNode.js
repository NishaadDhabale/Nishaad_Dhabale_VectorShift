import { useState } from 'react';
import { Abstractnode } from '../components/nodeabstract';

export const ConditionNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customCondition-', 'conditon_')
  );

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const node = {
    id: id,
    name: 'conditionnode',
    type: 'conditionnode',
    description: 'Condition: ',
    data: {
      inputName: currName,
    },
  };

  const handle = [
    {
      type: 'source',
      style: { top: `${200 / 3}%` },
      id: `${id}-else`,
    },
    {
      type: 'source',
      style: { top: `${100 / 3}%` },
      id: `${id}-else-if`,
    },
    {
      type: 'target',
      style: { top: `${100 / 3}%` },
      id: `${id}-input`,
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
