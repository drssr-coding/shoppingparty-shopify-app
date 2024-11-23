import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Login from './components/Login';
import Demo from './components/Demo';
import DemoStore from './components/DemoStore';
import ShopifyDemo from './components/ShopifyDemo';

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Routes>
        <Route path="/" element={<DemoStore />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/shopify-demo" element={<ShopifyDemo />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
}