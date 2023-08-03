import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import parse from 'html-react-parser';

interface RichTextComponentProps {
  html: string;
}

export const RichTextComponent = (props: RichTextComponentProps): JSX.Element => {
  return (
    <div className="container">
      <h2>Html text Component</h2>
      <p>{parse(props.html) || 'Html Component Default'}</p>
    </div>
  );
};

FEAAS.External.registerComponent(RichTextComponent, {
  name: 'MultiLineText',
  properties: {
    html: {
      type: 'string',
    },
  },
});
