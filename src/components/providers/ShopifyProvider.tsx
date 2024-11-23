import { Provider as AppBridgeProvider } from '@shopify/app-bridge-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ShopifyProviderProps {
  children: React.ReactNode;
}

export function ShopifyProvider({ children }: ShopifyProviderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const host = params.get('host');
  const shop = params.get('shop');

  // If we're missing required parameters, redirect to login
  if (!host || !shop) {
    navigate('/login');
    return null;
  }

  const config = {
    apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
    host: host,
    forceRedirect: true
  };

  return (
    <AppBridgeProvider config={config}>
      {children}
    </AppBridgeProvider>
  );
}