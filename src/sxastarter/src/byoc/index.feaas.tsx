import Image from 'next/image';
import * as FEAAS from '@sitecore-feaas/clientside/react';

// Register single react and nextjs components to be used in Component Builder

// Register next Image to be used in Component Builder
// eslint-disable-next-line @typescript-eslint/no-explicit-any
FEAAS.setElementImplementation('img', ({ children, ...attributes }: any) => {
  console.log(children);
  return <Image {...attributes} />;
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
