import { SitecorePageProps } from 'lib/page-props';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { Plugin } from '..';
import { siteResolver } from 'lib/site-resolver';
import config from 'temp/config';
export const SITE_PREFIX = '_site_';

type SiteRewriteData = {
  siteName: string;
};

class SitePlugin implements Plugin {
  order = 0;

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (context.preview) return props;

    const path =
      context.params === undefined
        ? '/'
        : Array.isArray(context.params.path)
        ? context.params.path.join('/')
        : context.params.path ?? '/';

    // Get site name (from path)
    const siteData = getSiteRewriteData(path, config.jssAppName);
    console.log('SITES');
    console.log(siteResolver.sites);
    console.log(path);
    console.log(context.params?.path);
    // Resolve site by name
    props.site = siteResolver.getByName(siteData.siteName);

    return props;
  }
}

function getSiteRewriteData(pathname: string, defaultSiteName: string): SiteRewriteData {
  const data = {
    siteName: defaultSiteName,
  };

  const path = pathname.endsWith('/') ? pathname : pathname + '/';
  const result = path.match(`${SITE_PREFIX}(.*?)(\..+)?\\/`);

  if (result && result[1] !== '') {
    data.siteName = result[1];
  }

  return data;
}

export const sitePlugin = new SitePlugin();
