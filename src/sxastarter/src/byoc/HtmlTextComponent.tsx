import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import parse from 'html-react-parser';

interface HtmlTextComponentProps {
  html: string;
}

export const HtmlTextComponent = (props: HtmlTextComponentProps): JSX.Element => {
  return (
    <div className="container">
      <h2>Html text Component</h2>
      <p>{parse(props.html) || 'Html Component Default'}</p>
    </div>
  );
};

FEAAS.External.registerComponent(HtmlTextComponent, {
  name: 'HtmlTextComponent',
  properties: {
    html: {
      type: 'string',
    },
  },
});
