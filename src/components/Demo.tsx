import { useState, useEffect } from 'react';
import { Page, Layout, Card, Text, BlockStack, Button, Avatar, TextField } from '@shopify/polaris';
import { Users, MessageCircle, ShoppingBag } from 'lucide-react';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
}

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

export default function Demo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [participants] = useState([
    { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=mike' },
    { name: 'Emma', avatar: 'https://i.pravatar.cc/150?u=emma' }
  ]);

  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Classic White Sneakers',
      price: '$89.99',
      image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=300'
    },
    {
      id: '2',
      name: 'Denim Jacket',
      price: '$129.99',
      image: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=300'
    },
    {
      id: '3',
      name: 'Summer Dress',
      price: '$79.99',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300'
    }
  ]);

  useEffect(() => {
    // Simulate initial messages
    setMessages([
      {
        id: '1',
        user: 'Sarah',
        content: 'Hey everyone! Ready to find some great outfits?',
        timestamp: new Date(Date.now() - 300000)
      },
      {
        id: '2',
        user: 'Mike',
        content: 'Those sneakers look amazing!',
        timestamp: new Date(Date.now() - 200000)
      },
      {
        id: '3',
        user: 'Emma',
        content: 'The denim jacket would look great with them',
        timestamp: new Date(Date.now() - 100000)
      }
    ]);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          user: 'You',
          content: newMessage,
          timestamp: new Date()
        }
      ]);
      setNewMessage('');
    }
  };

  return (
    <Page title="Live Demo">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <div className="flex items-center gap-3 p-4">
                <Users className="w-6 h-6 text-purple-600" />
                <Text variant="headingMd" as="h2">Active Participants</Text>
              </div>
              <div className="flex gap-4 p-4">
                {participants.map((participant) => (
                  <div key={participant.name} className="text-center">
                    <Avatar customer source={participant.avatar} />
                    <Text as="p" variant="bodySm">{participant.name}</Text>
                  </div>
                ))}
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <BlockStack gap="400">
                <div className="flex items-center gap-3 p-4">
                  <ShoppingBag className="w-6 h-6 text-purple-600" />
                  <Text variant="headingMd" as="h2">Shared Products</Text>
                </div>
                <div className="space-y-4 p-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 border rounded p-3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <Text variant="bodyMd" as="p" fontWeight="bold">{product.name}</Text>
                        <Text variant="bodySm" as="p">{product.price}</Text>
                      </div>
                      <Button variant="primary" tone="success">Share</Button>
                    </div>
                  ))}
                </div>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <div className="flex items-center gap-3 p-4">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                  <Text variant="headingMd" as="h2">Live Chat</Text>
                </div>
                <div className="p-4">
                  <div className="h-[400px] flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {messages.map((message) => (
                        <div key={message.id} className="flex gap-3">
                          <div>
                            <Text variant="bodySm" as="p" fontWeight="bold">
                              {message.user}
                            </Text>
                            <Text variant="bodyMd" as="p">{message.content}</Text>
                            <Text variant="bodySm" as="p" tone="subdued">
                              {message.timestamp.toLocaleTimeString()}
                            </Text>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <TextField
                          label="Message"
                          labelHidden
                          value={newMessage}
                          onChange={setNewMessage}
                          autoComplete="off"
                          multiline={1}
                          onBlur={() => {}}
                          onFocus={() => {}}
                        />
                      </div>
                      <Button onClick={handleSendMessage} variant="primary">
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </BlockStack>
            </Card>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}