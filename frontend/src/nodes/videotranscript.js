// inputNode.js

import { useState } from 'react';
import { Abstractnode } from '../components/nodeabstract';

export const VideoNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customVideo-', 'video_')
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
    name: 'Video Transcript ',
    type: 'Video transcript',
    description: 'Video Url/mp4: ',
    data: {
      inputName: currName,
      inputType: inputType,
    },
  };

  const handle = [
    {
      type: 'source',
      style: {},
      id: `${id}-transcribbed`,

    },
        {
      type: 'target',
      style: {},
      id: `${id}-videourl/mp3`,

    }
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
