import React from 'react';
import {
  Link as JssLink,
  ImageField,
  Field,
  LinkField,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { NextImage as JssImage } from './NextImage';

interface Fields {
  Image: ImageField;
  ImageCaption: Field<string>;
  TargetUrl: LinkField;
}

type ImageProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ImageDefault = (props: ImageProps): JSX.Element => (
  <div className={`component image ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Image</span>
    </div>
  </div>
);

export const Banner = (props: ImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const backgroundStyle = { backgroundImage: `url('${props?.fields?.Image?.value?.src}')` };
  const Image = () =>
    props.fields.Image.editable ? <JssImage field={props.fields.Image} /> : null;

  return (
    <div className={`component hero-banner ${props.params.styles} sc-change`}>
      <div className="component-content sc-sxa-image-hero-banner" style={backgroundStyle}>
        {sitecoreContext.pageEditing ? <Image /> : ''}
      </div>
    </div>
  );
};

export const Default = (props: ImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  if (props.fields) {
    const Image = () => <JssImage field={props.fields.Image} />;
    const id = props.params.RenderingIdentifier;

    return (
      <div className={`component image ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          {sitecoreContext.pageState === 'edit' ? (
            <Image />
          ) : (
            <JssLink field={props.fields.TargetUrl}>
              <Image />
            </JssLink>
          )}
          <Text
            tag="span"
            className="image-caption field-imagecaption"
            field={props.fields.ImageCaption}
          />
        </div>
      </div>
    );
  }

  return <ImageDefault {...props} />;
};
