import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getShopFromQuery, buildShopifyRedirect } from '../../utils/shopify';

interface AuthContextType {
  isAuthenticated: boolean;
  shop: string | null;
  login: (shop: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [shop, setShop] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const shopParam = getShopFromQuery();
    if (shopParam) {
      setShop(shopParam);
      // Check if we have a valid session
      const sessionToken = sessionStorage.getItem('shopify_token');
      if (sessionToken) {
        setIsAuthenticated(true);
      } else {
        // Redirect to Shopify OAuth
        window.location.href = buildShopifyRedirect(shopParam);
      }
    }
  }, [location]);

  const login = (shopDomain: string) => {
    setShop(shopDomain);
    window.location.href = buildShopifyRedirect(shopDomain);
  };

  const logout = () => {
    sessionStorage.removeItem('shopify_token');
    setIsAuthenticated(false);
    setShop(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, shop, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};