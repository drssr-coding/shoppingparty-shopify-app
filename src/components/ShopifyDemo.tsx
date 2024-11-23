import { useEffect, useState } from 'react';
import { Page, Layout, Card, Button, Text, BlockStack, Banner } from '@shopify/polaris';
import { Users } from 'lucide-react';
import { getProducts } from '../utils/shopifyClient';

interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
}

export default function ShopifyDemo() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const shopifyProducts = await getProducts();
      setProducts(shopifyProducts);
    } catch (err) {
      setError('Failed to load products. Please make sure you are logged into your Shopify store.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartParty = (productId: string) => {
    window.location.href = `/demo?product=${productId}`;
  };

  if (loading) {
    return (
      <Page title="Loading Store Products...">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="p">Loading products from {import.meta.env.VITE_SHOP_DOMAIN}...</Text>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  if (error) {
    return (
      <Page title="Error">
        <Layout>
          <Layout.Section>
            <Banner tone="critical">
              <p>{error}</p>
              <p>Please make sure you have:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Installed the app in your Shopify store</li>
                <li>Granted necessary permissions</li>
                <li>Have valid API credentials</li>
              </ul>
            </Banner>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Page title="Your Store Products">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingLg" as="h2">Start a Shopping Party with Your Products</Text>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Card key={product.id}>
                    <BlockStack gap="400">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-48 object-cover rounded"
                        />
                      )}
                      <div className="p-4">
                        <Text variant="headingMd" as="h3">{product.title}</Text>
                        <Text variant="bodyMd" as="p" tone="subdued">
                          {product.description}
                        </Text>
                        <Text variant="headingMd" as="p">${product.price}</Text>
                        <div className="mt-4 space-y-2">
                          <Button 
                            fullWidth 
                            variant="primary"
                            onClick={() => handleStartParty(product.id)}
                            icon={<Users className="w-5 h-5" />}
                          >
                            Start Shopping Party
                          </Button>
                        </div>
                      </div>
                    </BlockStack>
                  </Card>
                ))}
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}