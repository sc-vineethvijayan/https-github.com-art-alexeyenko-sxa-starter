import {
  ServerlessEditingDataService,
  BasicEditingDataService,
} from '@sitecore-jss/sitecore-jss-nextjs/editing';

// !!CHANGE!!
// Custom ServerlessEditingDataService for Netlify.
// This swaps the default API endpoint (/api/editing/data/[key]) for
// our dedicated Netlify function implementation.
export const netlifyEditingDataService = process.env.NETLIFY_TEST
  ? process.env.NEXT_SPLIT_API_ROUTES
    ? new ServerlessEditingDataService()
    : new ServerlessEditingDataService({
        apiRoute: '/.netlify/functions/editing-data-cache?key=[key]',
      })
  : new BasicEditingDataService();
