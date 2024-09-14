import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import visualizer from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
  ],
  build: {
    minify: 'terser', // Ensure terser is used for minification
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
