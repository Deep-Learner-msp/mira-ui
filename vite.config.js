import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from '@rollup/plugin-visualizer'; // Import from @rollup/plugin-visualizer

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }), // Call visualizer as a function
  ],
  build: {
    minify: 'terser',
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
