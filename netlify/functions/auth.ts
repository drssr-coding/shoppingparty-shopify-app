import { Handler } from '@netlify/functions';
import crypto from 'crypto';

const SHOPIFY_API_KEY = process.env.VITE_SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.VITE_SHOPIFY_API_SECRET;
const APP_URL = process.env.VITE_APP_URL;

export const handler: Handler = async (event) => {
  // Handle the initial OAuth redirect
  if (event.path === '/auth') {
    const shop = event.queryStringParameters?.shop;
    if (!shop) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing shop parameter' })
      };
    }

    const nonce = crypto.randomBytes(16).toString('hex');
    const redirectUri = `${APP_URL}/auth/callback`;
    const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=read_products,write_products,read_customers,write_customers&redirect_uri=${redirectUri}&state=${nonce}`;

    return {
      statusCode: 302,
      headers: {
        Location: authUrl
      }
    };
  }

  // Handle the OAuth callback
  if (event.path === '/auth/callback') {
    const { code, shop, state, hmac } = event.queryStringParameters || {};

    if (!code || !shop || !hmac) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' })
      };
    }

    // Verify the request is authentic
    const params = { ...event.queryStringParameters };
    delete params.hmac;
    
    const message = Object.entries(params)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const generatedHash = crypto
      .createHmac('sha256', SHOPIFY_API_SECRET)
      .update(message)
      .digest('hex');

    if (generatedHash !== hmac) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid hmac' })
      };
    }

    try {
      // Exchange the authorization code for an access token
      const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: SHOPIFY_API_KEY,
          client_secret: SHOPIFY_API_SECRET,
          code
        })
      });

      const data = await response.json();

      // Redirect back to the app with the access token
      return {
        statusCode: 302,
        headers: {
          'Set-Cookie': `shopifyAccessToken=${data.access_token}; Path=/; Secure; HttpOnly; SameSite=Lax`,
          Location: `${APP_URL}?shop=${shop}`
        }
      };
    } catch (error) {
      console.error('OAuth error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to complete OAuth' })
      };
    }
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'Not found' })
  };
};