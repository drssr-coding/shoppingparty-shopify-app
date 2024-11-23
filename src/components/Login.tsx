import { useEffect } from 'react';
import { Page, Layout, Card, Text, BlockStack, Banner } from '@shopify/polaris';
import { useLocation } from 'react-router-dom';

export default function Login() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const shop = params.get('shop');

  useEffect(() => {
    if (shop) {
      const apiKey = import.meta.env.VITE_SHOPIFY_API_KEY;
      const redirectUri = `${import.meta.env.VITE_APP_URL}/auth/callback`;
      const scopes = 'read_products,write_products,read_customers,write_customers';
      const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}`;
      
      window.location.href = installUrl;
    }
  }, [shop]);

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingLg" as="h1">
                Shopping Party
              </Text>
              {!shop ? (
                <Banner tone="info">
                  This app can only be accessed through your Shopify admin. Please install it from the Shopify App Store or through your store's admin panel.
                </Banner>
              ) : (
                <BlockStack gap="400" align="center">
                  <Text as="p">
                    Connecting to your Shopify store...
                  </Text>
                </BlockStack>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}