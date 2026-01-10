// textNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Abstractnode } from './nodeabstract';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const inputprops = {
    type: 'Text',
    currText: currText,
    handleTextChange: handleTextChange,
  };
  const node = {
    name: 'text',
    type: 'text',
    description: 'Text:',
    id: id,
  };
  const handle = [
    {
      type: 'source',
      id: `${id}-output`,
    },
  ];

  return (
    <Abstractnode node={node} inputprop={inputprops} handle={handle}>
      <div></div>
    </Abstractnode>
  );
};
