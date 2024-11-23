import { Page, Layout, Card, FormLayout, TextField, Button } from '@shopify/polaris';
import { useState } from 'react';

export default function Settings() {
  const [sessionDuration, setSessionDuration] = useState('30');
  const [maxParticipants, setMaxParticipants] = useState('10');

  const handleSave = () => {
    // TODO: Implement settings save functionality
    console.log('Saving settings:', { sessionDuration, maxParticipants });
  };

  return (
    <Page title="Settings">
      <Layout>
        <Layout.Section>
          <Card>
            <div className="p-4">
              <FormLayout>
                <TextField
                  label="Session Duration (minutes)"
                  type="number"
                  value={sessionDuration}
                  onChange={setSessionDuration}
                  autoComplete="off"
                  min={5}
                  max={120}
                  helpText="Maximum duration for a shopping session (5-120 minutes)"
                />
                <TextField
                  label="Maximum Participants"
                  type="number"
                  value={maxParticipants}
                  onChange={setMaxParticipants}
                  autoComplete="off"
                  min={2}
                  max={50}
                  helpText="Maximum number of participants per session (2-50 people)"
                />
                <Button onClick={handleSave} variant="primary">
                  Save Settings
                </Button>
              </FormLayout>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}