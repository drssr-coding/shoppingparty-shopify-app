import { Page, Layout, Card, Button, Text, BlockStack, Thumbnail, Banner } from '@shopify/polaris';
import { Users, Store, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: '1',
    title: 'Classic White Sneakers',
    description: 'Comfortable and stylish sneakers for everyday wear',
    price: '$89.99',
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=300'
  },
  {
    id: '2',
    title: 'Denim Jacket',
    description: 'Versatile denim jacket perfect for any season',
    price: '$129.99',
    image: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=300'
  },
  {
    id: '3',
    title: 'Summer Dress',
    description: 'Light and breezy dress for warm days',
    price: '$79.99',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300'
  }
];

export default function DemoStore() {
  const navigate = useNavigate();

  const handleTryDemo = () => {
    navigate('/demo');
  };

  const handleStartParty = () => {
    navigate('/demo');
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <div className="flex items-center justify-between p-4">
              <Text variant="headingXl" as="h1">Shopping Party</Text>
              <nav className="flex gap-4">
                <Link to="/demo" className="text-blue-600 hover:text-blue-800">Live Demo</Link>
                <Link to="/pricing" className="text-blue-600 hover:text-blue-800">Pricing</Link>
                <Link to="/faq" className="text-blue-600 hover:text-blue-800">FAQ</Link>
                <Link to="/support" className="text-blue-600 hover:text-blue-800">Support</Link>
                <Link to="/tutorial" className="text-blue-600 hover:text-blue-800">Tutorial</Link>
              </nav>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <div className="text-center p-8">
                <Text variant="headingXl" as="h2">Transform Online Shopping into Real Social Experiences</Text>
                <div className="max-w-2xl mx-auto mt-4">
                  <Text variant="bodyLg" as="p">
                    Combine the convenience of online shopping with the joy of in-person social experiences. Shop together online, then meet in-store or at partner locations to try items together!
                  </Text>
                </div>
                <div className="mt-6 space-y-4">
                  <Button 
                    size="large" 
                    variant="primary"
                    onClick={handleTryDemo}
                  >
                    Try Live Demo
                  </Button>
                </div>
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Store className="w-8 h-8 text-purple-600" />
                  <Text variant="headingLg" as="h2">In-Person Shopping Experience</Text>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?w=800&h=600&fit=crop" 
                      alt="People shopping together"
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                  <div>
                    <BlockStack gap="400">
                      <Text variant="headingMd" as="h3">Meet & Try Together</Text>
                      <Text variant="bodyMd" as="p">
                        Schedule in-person meetings at partner locations or the store to try items together. Turn online shopping into a real social event!
                      </Text>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-6 h-6 text-purple-600 mt-1" />
                          <div>
                            <Text variant="headingSm" as="h4">Partner Fitting Rooms</Text>
                            <Text variant="bodyMd" as="p">Access exclusive fitting rooms at partner locations</Text>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Store className="w-6 h-6 text-purple-600 mt-1" />
                          <div>
                            <Text variant="headingSm" as="h4">In-Store Experience</Text>
                            <Text variant="bodyMd" as="p">Meet at the store with items ready to try</Text>
                          </div>
                        </div>
                      </div>
                    </BlockStack>
                  </div>
                </div>
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <div className="flex items-center justify-between p-4">
                <Text variant="headingLg" as="h2">Featured Products</Text>
                <Button 
                  onClick={handleStartParty}
                  icon={<Users className="w-5 h-5" />}
                >
                  Start Shopping Party
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {products.map((product) => (
                  <Card key={product.id}>
                    <BlockStack gap="400">
                      <div className="aspect-square">
                        <Thumbnail
                          source={product.image}
                          alt={product.title}
                          size="large"
                        />
                      </div>
                      <div className="p-4">
                        <Text variant="headingMd" as="h3">{product.title}</Text>
                        <Text variant="bodyMd" as="p" tone="subdued">
                          {product.description}
                        </Text>
                        <Text variant="headingMd" as="p">{product.price}</Text>
                        <div className="mt-4 space-y-2">
                          <Button fullWidth>Add to Cart</Button>
                          <Button 
                            fullWidth 
                            variant="primary" 
                            tone="success"
                            onClick={handleStartParty}
                          >
                            Add to Party
                          </Button>
                          <Banner tone="info">
                            <Text variant="bodySm" as="p">
                              Available for in-store try-on with your shopping party!
                            </Text>
                          </Banner>
                        </div>
                      </div>
                    </BlockStack>
                  </Card>
                ))}
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <div className="p-8">
                <Text variant="headingLg" as="h2" alignment="center">Key Features</Text>
                <div className="grid md:grid-cols-4 gap-8 mt-6">
                  <div className="text-center">
                    <Text variant="headingMd" as="h3">Real-time Collaboration</Text>
                    <Text variant="bodyMd" as="p">Shop together with friends in real-time</Text>
                  </div>
                  <div className="text-center">
                    <Text variant="headingMd" as="h3">Live Chat</Text>
                    <Text variant="bodyMd" as="p">Discuss products and make decisions together</Text>
                  </div>
                  <div className="text-center">
                    <Text variant="headingMd" as="h3">Product Sharing</Text>
                    <Text variant="bodyMd" as="p">Share and discover products as a group</Text>
                  </div>
                  <div className="text-center">
                    <Text variant="headingMd" as="h3">In-Person Meetups</Text>
                    <Text variant="bodyMd" as="p">Try items together at partner locations</Text>
                  </div>
                </div>
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}