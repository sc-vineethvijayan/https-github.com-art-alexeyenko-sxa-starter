import { SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs';
import { editingDataService } from '@sitecore-jss/sitecore-jss-nextjs/editing';
import { SitecorePageProps } from 'lib/page-props';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { Plugin } from '..';
import { netlifyEditingDataService } from 'lib/netlify-editing-data-service';

class PreviewModePlugin implements Plugin {
  order = 1;

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    if (!context.preview) return props;

    // If we're in preview (editing) mode, use data already sent along with the editing request
    // !!CHANGE!!
    // Use Netlify editing data service (uses dedicated Netlify function)
    const data = await (process.env.NETLIFY_TEST
      ? netlifyEditingDataService
      : editingDataService
    ).getEditingData(context.previewData);
    if (!data) {
      throw new Error(
        `Unable to get editing data for preview ${JSON.stringify(context.previewData)}`
      );
    }
    props.site = data.layoutData.sitecore.context.site as SiteInfo;
    props.locale = data.language;
    props.layoutData = data.layoutData;
    props.dictionary = data.dictionary;

    return props;
  }
}

export const previewModePlugin = new PreviewModePlugin();
