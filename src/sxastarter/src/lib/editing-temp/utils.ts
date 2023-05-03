const VERCEL_PROTECTION_BYPASS_SECRET = 'x-vercel-protection-bypass';

export const getJssEditingSecret = (): string => {
  const secret = process.env.JSS_EDITING_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error('The JSS_EDITING_SECRET environment variable is missing or invalid.');
  }
  return secret;
};

export const tryGetVercelProtectionBypass = (): string => {
  const bypassSecret = process.env.VERCEL_PROTECTION_BYPASS_SECRET;
  if (!bypassSecret || bypassSecret.length === 0) {
    throw Error('The VERCEL_PROTECTION_BYPASS_SECRET environment variable is missing or invalid.');
  }
  return bypassSecret;
};

export const applyVercelProtection = (url: string) => {
  if (process.env.VERCEL_PROTECTION_BYPASS_SECRET) return url;
  const queryStringCharacter = url.indexOf('?') === -1 ? '?' : '&';
  return `${url}${queryStringCharacter}${VERCEL_PROTECTION_BYPASS_SECRET}=${process.env.VERCEL_PROTECTION_BYPASS_SECRET}`;
};

export const applyPulicUrlAndVercelProtectionBypass = (relativeUrl: string) => {
  if (process.env.VERCEL_PROTECTION_BYPASS_SECRET) return `${getPublicUrl()}${relativeUrl}`;
  const queryStringCharacter = relativeUrl.indexOf('?') === -1 ? '?' : '&';
  return `${getPublicUrl()}${relativeUrl}${queryStringCharacter}${VERCEL_PROTECTION_BYPASS_SECRET}=${
    process.env.VERCEL_PROTECTION_BYPASS_SECRET
  }`;
};

export const getVercelProtectionBypassQueryString = () => {
  return process.env.VERCEL_PROTECTION_BYPASS_SECRET
    ? `${VERCEL_PROTECTION_BYPASS_SECRET}=${process.env.VERCEL_PROTECTION_BYPASS_SECRET}`
    : '';
};

export const getPublicUrl = (): string => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  let url = process.env.PUBLIC_URL;
  if (url === undefined) {
    console.warn(
      `
        'Warning:'
 An PUBLIC_URL environment variable is not defined. Falling back to http://localhost:3000.`
    );
    url = 'http://localhost:3000';
  } else {
    try {
      new URL(url);
    } catch (error) {
      throw new Error(`The PUBLIC_URL environment variable '${url}' is not a valid URL.`);
    }
  }
  // Ensure no trailing slash
  return url.toString().replace(/\/$/, '');
};
