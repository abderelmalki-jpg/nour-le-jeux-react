import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Vendors tiers
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('node_modules/posthog-js') || id.includes('node_modules/@posthog')) {
              return 'vendor-analytics';
            }
            if (id.includes('node_modules/motion') || id.includes('node_modules/lucide-react')) {
              return 'vendor-ui';
            }
            // Découpage granulaire des chapitres et données volumineuses
            if (id.includes('src/data/chapter1')) {
              return 'chapter-1-data';
            }
            if (id.includes('src/data/chapter2')) {
              return 'chapter-2-data';
            }
            if (id.includes('src/data/chapter3')) {
              return 'chapter-3-data';
            }
            if (id.includes('src/data/chapter4')) {
              return 'chapter-4-data';
            }
            if (id.includes('src/data/chapter5')) {
              return 'chapter-5-data';
            }
            if (id.includes('src/data/islamicQuizzes') || id.includes('src/data/knowledge')) {
              return 'game-knowledge';
            }
            if (id.includes('src/data/locales')) {
              return 'locales-data';
            }
            if (id.includes('src/i18n/')) {
              return 'i18n-data';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
