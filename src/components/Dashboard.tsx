import { Page, Layout, Card, Button, Text, BlockStack } from '@shopify/polaris';
import { Users } from 'lucide-react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';

export default function Dashboard() {
  const app = useAppBridge();
  
  const handleCreateSession = () => {
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.ADMIN_PATH, '/products');
  };

  return (
    <Page title="Shopping Party">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <div className="flex items-center gap-3 p-4">
                <Users className="w-8 h-8 text-purple-600" />
                <Text variant="headingLg" as="h2">
                  Welcome to Shopping Party
                </Text>
              </div>
              <div className="p-4">
                <Text as="p">
                  Create interactive shopping sessions and let your customers shop together in real-time.
                </Text>
              </div>
              <div className="p-4">
                <Button onClick={handleCreateSession} variant="primary">
                  Create Shopping Session
                </Button>
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}