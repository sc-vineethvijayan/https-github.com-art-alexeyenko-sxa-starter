import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

interface LinkComponentProps {
  href: string;
}

export const LinkComponent = (props: LinkComponentProps): JSX.Element => {
  return (
    <div className="container">
      <h2>This is Link Component</h2>
      <div>
        <a href={props.href}>Check out this link!</a>
      </div>
    </div>
  );
};

FEAAS.External.registerComponent(LinkComponent, {
  name: 'LinkComponent',
  properties: {
    href: {
      type: 'string',
    },
  },
});
