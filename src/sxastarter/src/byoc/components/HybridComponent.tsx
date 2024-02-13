import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

export const HybridComponent = (): JSX.Element => {
  return (
    <div className="container">
      <p>Hybrid</p>
    </div>
  );
};

FEAAS.External.registerComponent(HybridComponent, {
  name: 'HybridComponent',
  properties: { 
  },
});
