export const DEV_HUB_SESSION_COOKIE = "dev_hub_session";

export const devHubSessionToken = process.env.DEV_HUB_SESSION_TOKEN;
export const devHubPassword = process.env.DEV_HUB_PASSWORD;

export function hasValidDevHubSession(cookieValue: string | undefined) {
  if (!devHubSessionToken || !cookieValue) {
    return false;
  }

  return cookieValue === devHubSessionToken;
}
