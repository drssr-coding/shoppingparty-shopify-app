import { Handler } from '@netlify/functions';
import crypto from 'crypto';

const SHOPIFY_API_SECRET = process.env.VITE_SHOPIFY_API_SECRET;

const verifyWebhook = (data: string, hmac: string) => {
  const generatedHash = crypto
    .createHmac('sha256', SHOPIFY_API_SECRET)
    .update(data)
    .digest('base64');
  return generatedHash === hmac;
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const hmac = event.headers['x-shopify-hmac-sha256'];
  const topic = event.headers['x-shopify-topic'];
  const shop = event.headers['x-shopify-shop-domain'];

  // Verify webhook authenticity
  if (!verifyWebhook(event.body, hmac)) {
    return { statusCode: 401, body: 'Invalid webhook signature' };
  }

  try {
    switch (topic) {
      case 'customers/data_request':
        // Handle customer data request (GDPR)
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Data request will be processed',
            shop,
            topic
          })
        };

      case 'customers/redact':
        // Handle customer data deletion (GDPR)
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Customer data will be redacted',
            shop,
            topic
          })
        };

      case 'shop/redact':
        // Handle shop data deletion (GDPR)
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Shop data will be redacted',
            shop,
            topic
          })
        };

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Unknown webhook topic' })
        };
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook processing failed' })
    };
  }
};