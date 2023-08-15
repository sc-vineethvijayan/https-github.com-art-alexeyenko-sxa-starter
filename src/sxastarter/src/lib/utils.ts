export const getPublicUrl = (): string => {
  if (process.env.NETLIFY) {
    switch (process.env.CONTEXT) {
      case 'deploy-preview':
        return process.env.DEPLOY_URL || '';
      case 'branch-deploy':
        return process.env.DEPLOY_PRIME_URL || '';
      default:
        return process.env.URL || '';
      }
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  let url = process.env.PUBLIC_URL;
  if (url === undefined) {
    console.warn(
      `'Warning:'
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
