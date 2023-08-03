import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

interface TextComponentProps {
  title: string;
}

export const TextComponent = (props: TextComponentProps): JSX.Element => {
  return (
    <div className="container">
      <h2>${props.title || 'Text Component Default Text'}</h2>
    </div>
  );
};

FEAAS.External.registerComponent(TextComponent, {
  name: 'TextComponent',
  properties: {
    title: {
      type: 'string',
    },
  },
});
