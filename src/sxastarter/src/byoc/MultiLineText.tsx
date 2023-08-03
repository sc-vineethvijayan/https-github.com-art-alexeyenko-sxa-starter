import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

interface RichTextComponentProps {
  multiline: string;
}

export const RichTextComponent = (props: RichTextComponentProps): JSX.Element => {
  return (
    <div className="container">
      <h2>Multiline text Component</h2>
      <p>${props.multiline || 'Multiline Component Default'}</p>
    </div>
  );
};

FEAAS.External.registerComponent(RichTextComponent, {
  name: 'RichTextComponent',
  properties: {
    multiline: {
      type: 'string',
    },
  },
});
