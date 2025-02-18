import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
 server: {
    host: '0.0.0.0', // Allow connections from outside the container
    port: 5173,       // Specify the port
    watch: {
      usePolling: true, // Required for file changes to be detected in Docker
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
