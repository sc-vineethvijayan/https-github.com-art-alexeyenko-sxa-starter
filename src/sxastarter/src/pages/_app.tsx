import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import BringYour from 'src/byoc/BringYour';
import { SecondComponent } from 'src/byoc/SecondComponent';

import 'assets/main.scss';

FEAAS.External.registerComponent(BringYour, {
  properties: {
    num: {
      type: 'number'
    }
  }
});
FEAAS.External.registerComponent(SecondComponent);

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  return (
    // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
    // Note Next.js does not (currently) provide anything for translation, only i18n routing.
    // If your app is not multilingual, next-localization and references to it can be removed.
    <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
      <Component {...rest} />
    </I18nProvider>
  );
}

export default App;
