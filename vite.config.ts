import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: 3000,
      host: true,
      hmr: {
        protocol: 'ws',
      },
    },
    define: {
      'process.env.VITE_SHOPIFY_API_KEY': JSON.stringify(env.VITE_SHOPIFY_API_KEY),
      'process.env.VITE_APP_URL': JSON.stringify(env.VITE_APP_URL),
    },
  };
});