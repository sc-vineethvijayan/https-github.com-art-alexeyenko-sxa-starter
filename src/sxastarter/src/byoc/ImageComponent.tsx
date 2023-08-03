import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

interface ImageComponentProps {
  href: string;
}

export const ImageComponent = (props: ImageComponentProps): JSX.Element => {
  try {
    new URL(props.href);
  } catch (_) {
    console.log('Image URL is empty or malformed');
  }
  return (
    <div className="container">
      <h2>This is Image Component</h2>
      <div>
        <img src={props.href} alt="ImageIsHere" />
      </div>
    </div>
  );
};

FEAAS.External.registerComponent(ImageComponent, {
  name: 'ImageComponent',
  properties: {
    href: {
      type: 'string',
    },
  },
});
