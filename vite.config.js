import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';

// Vite configuration
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }), // Visualizer to inspect build output size
  ],
  build: {
    // Optimize build output
    minify: 'terser', // Use Terser for minification
    chunkSizeWarningLimit: 500, // Set the chunk size warning limit (in KB)
    rollupOptions: {
      output: {
        // Manual chunking to separate vendor libraries
        manualChunks: {
          vendor: ['react', 'react-dom'], // Adjust based on your dependencies
        },
      },
    },
  },
});
