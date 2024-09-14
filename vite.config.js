import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows network access if needed
    port: 5173, // Ensure the port is specified and not in conflict
    open: true, // Automatically opens the browser when running the dev server
  },
  build: {
    outDir: 'dist', // Default output folder for production build
  },
});
