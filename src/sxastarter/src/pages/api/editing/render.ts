import {
  EditingRenderMiddleware,
  editingDataService,
} from '@sitecore-jss/sitecore-jss-nextjs/editing';
import { netlifyEditingDataService } from 'lib/netlify-editing-data-service';

/**
 * This Next.js API route is used to handle POST requests from Sitecore editors.
 * This route should match the `serverSideRenderingEngineEndpointUrl` in your Sitecore configuration,
 * which is set to "http://localhost:3000/api/editing/render" by default (see \sitecore\config\sxastarter.config).
 *
 * The `EditingRenderMiddleware` will
 *  1. Extract editing data from the Sitecore editor POST request
 *  2. Stash this data (for later use in the page render request) via an `EditingDataService`, which returns a key for retrieval
 *  3. Enable Next.js Preview Mode, passing our stashed editing data key as preview data
 *  4. Invoke the actual page render request, passing along the Preview Mode cookies.
 *     This allows retrieval of the editing data in preview context (via an `EditingDataService`) - see `SitecorePagePropsFactory`
 *  5. Return the rendered page HTML to the Sitecore editor
 */

// Bump body size limit (1mb by default) and disable response limit for Sitecore editor payloads
// See https://nextjs.org/docs/api-routes/request-helpers#custom-config
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
    responseLimit: false,
  },
};

// Wire up the EditingRenderMiddleware handler
const handler = new EditingRenderMiddleware({
  // !!CHANGE!!
  // Use Netlify editing data service (uses dedicated Netlify function)
  editingDataService: process.env.NETLIFY_TEST ? netlifyEditingDataService : editingDataService,
  // !!CHANGE!!
  resolveServerUrl(req) {
    return (
      // URL will be defined in Netlify environments
      // See https://docs.netlify.com/functions/environment-variables/#functions
      process.env.URL ||
      `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${req.headers.host}`
    );
  },
}).getHandler();

export default handler;
