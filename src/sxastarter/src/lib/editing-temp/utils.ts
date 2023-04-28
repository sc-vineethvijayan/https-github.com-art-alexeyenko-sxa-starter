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
