import { ShopifySessionToken } from '../types/shopify';

export const getShopFromQuery = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('shop');
};

export const isShopifyEmbedded = () => {
  return window.self !== window.top;
};

export const buildShopifyRedirect = (shop: string) => {
  const apiKey = import.meta.env.VITE_SHOPIFY_API_KEY;
  const appUrl = import.meta.env.VITE_APP_URL;
  const scopes = 'read_products,write_products,read_customers,write_customers';
  
  const redirectUri = `${appUrl}/auth/callback`;
  const nonce = generateNonce();
  
  return `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}&state=${nonce}`;
};

export const getSessionToken = (): ShopifySessionToken | null => {
  const token = sessionStorage.getItem('shopify_token');
  return token ? JSON.parse(token) : null;
};

export const setSessionToken = (token: ShopifySessionToken) => {
  sessionStorage.setItem('shopify_token', JSON.stringify(token));
};

// Helper function to generate a nonce for OAuth state
function generateNonce() {
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  
  for (let i = 0; i < 20; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  return result;
}