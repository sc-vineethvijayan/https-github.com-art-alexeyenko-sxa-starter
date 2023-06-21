import { getPublicUrl as defaultGetPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs';

export const getPublicUrl = () => {
  return process.env.NODE_ENV !== 'production' ? defaultGetPublicUrl() : '';
};
