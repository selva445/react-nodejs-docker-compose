const REACT_APP_CLIENT_ID = "0oa5fkvdjox9XKXAR5d7";
const REACT_APP_OKTA_DOMAIN = "dev-37069477.okta.com";
const REACT_APP_PORT = "3000";

export const oktaConfig = {
  clientId: `${REACT_APP_CLIENT_ID}`,
  issuer: `https://${REACT_APP_OKTA_DOMAIN}/oauth2/default`,
  redirectUri: `http://localhost:${REACT_APP_PORT}/login/callback`, // this makes it so redirects to login if not logged in for secure routes
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
