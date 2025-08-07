import { defineEventHandler, getCookie, createError } from 'h3'
import { AuthConfig } from '~~/shared/config/auth.config' 
import { verifyAuthToken } from '../utils/auth.utils'; 

export default defineEventHandler(async (event) => {
  const token = getCookie(event, AuthConfig.accessTokenCookieKey)
  if (!token) {
    console.log('token not found, redirecting to login');
    // return sendRedirect(event, '/auth/login')
    return
  }

  const payload = await verifyAuthToken(token)
  if (!payload) {
    deleteCookie(event, AuthConfig.accessTokenCookieKey);
    return;
  }

  event.context.user = payload
})
