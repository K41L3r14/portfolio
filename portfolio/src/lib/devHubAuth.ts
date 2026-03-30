import { cookies } from "next/headers";

export const DEV_HUB_SESSION_COOKIE = "dev_hub_session";

export const devHubPassword = process.env.DEV_HUB_PASSWORD;
export const devHubSessionToken = process.env.DEV_HUB_SESSION_TOKEN;

export async function isDevHubAuthenticated() {
  if (!devHubSessionToken) {
    return false;
  }

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(DEV_HUB_SESSION_COOKIE)?.value;

  return cookieValue === devHubSessionToken;
}
