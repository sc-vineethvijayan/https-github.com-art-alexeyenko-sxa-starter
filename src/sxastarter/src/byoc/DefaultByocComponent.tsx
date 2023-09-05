import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

interface DefaultByocComponentProps {
  title: string;
  columnsCount: number;
}

export const DefaultByocComponent = (props: DefaultByocComponentProps): JSX.Element => {
  const columns: string[] = [];
  for (let i = 0; i < props.columnsCount; i++) {
    columns.push(`Component Column ${i + 1}`);
  }
  return (
    <div className="container">
      <h2>{props.title || 'BYOC Demo'}</h2>
      <div className="row">
        {columns.map((text, index) => (
          <div key={index} className={`col-sm-${props.columnsCount}`}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

FEAAS.External.registerComponent(DefaultByocComponent, {
  name: 'DefaultByocComponent',
  group: 'test group',
  properties: {
    title: {
      type: 'string',
    },
    columnsCount: {
      type: 'number',
    },
  },
});
