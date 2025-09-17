import { defineEventHandler, getCookie, getRequestURL, H3Event } from "h3";
import { AuthConfig } from "~~/shared/config/auth.config";
import { verifyAuthToken } from "../utils/auth.utils";

const EXCLUDED_ROUTES = ["/api/home/data", "/auth", "/", "/store", "/store"]

export default defineEventHandler(async (event: H3Event) => {
  if (isRouteExcluded(event)) return;

  const token = getCookie(event, AuthConfig.accessTokenCookieKey);
  if (!token) return sendRedirect(event, "/auth/login");

  const payload = await verifyAuthToken(token);
  if (!payload) {
    deleteCookie(event, AuthConfig.accessTokenCookieKey);
    return sendRedirect(event, "/auth/login");
  }

  event.context.user = payload;
});

function isRouteExcluded(event: H3Event): boolean {
  const path = event.path;
  
  let isExcluded = false;
  for (let i = 0; i < EXCLUDED_ROUTES.length; i++) {
    if (path.includes(EXCLUDED_ROUTES[i])) {
      isExcluded = true; 
      break;
    }
  }
  return isExcluded;
}
