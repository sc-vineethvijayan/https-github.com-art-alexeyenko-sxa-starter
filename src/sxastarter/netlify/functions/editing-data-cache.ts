import { Handler, HandlerEvent } from '@netlify/functions';
import { EditingDataDiskCache, EditingData } from '@sitecore-jss/sitecore-jss-nextjs/editing';

// !!CHANGE!!
// Implementation of default JSS Next.js API route (/api/editing/data/[key])
// as an explicit Netlify function.
// Uses the same EditingDataDiskCache for cache using /tmp drive.

const editingDataDiskCache = new EditingDataDiskCache();

const handler: Handler = async (event: HandlerEvent) => {
  const secret = event.queryStringParameters?.secret;
  const key = event.queryStringParameters?.key || '';
  const body = event.body || '';

  // Validate secret
  if (secret !== process.env.JSS_EDITING_SECRET) {
    return {
      statusCode: 401,
      body: 'Missing or invalid secret',
    };
  }

  switch (event.httpMethod) {
    case 'GET': {
      const data = await editingDataDiskCache.get(key);
      return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
    }
    case 'PUT': {
      await editingDataDiskCache.set(key, JSON.parse(body) as unknown as EditingData);
      return {
        statusCode: 200,
      };
    }
    default: {
      return {
        statusCode: 405,
        body: `Method ${event.httpMethod} Not Allowed`,
        multiValueHeaders: {
          Allow: ['GET', 'PUT'],
        },
      };
    }
  }
};

export { handler };
