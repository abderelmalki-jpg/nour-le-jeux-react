import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

/**
 * Converts OKLCH colors to sRGB hex/rgba and removes `in oklab` gradient
 * interpolation from the built CSS so older mobile browsers & Android WebViews
 * (Chrome < 111, Samsung Internet, older Safari) never render transparent cards/buttons.
 */
function oklchToSrgb(L: number, C: number, H: number, alpha?: number): string {
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const linToSrgb = (x: number) => {
    const clamped = Math.min(1, Math.max(0, x));
    return clamped <= 0.0031308
      ? 12.92 * clamped
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  };

  const r = Math.round(linToSrgb(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s) * 255);
  const g = Math.round(linToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s) * 255);
  const bl = Math.round(linToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s) * 255);

  if (alpha !== undefined && alpha < 1) {
    return `rgba(${r},${g},${bl},${alpha})`;
  }
  const hex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${hex(r)}${hex(g)}${hex(bl)}`;
}

function legacyMobileCssCompat(): Plugin {
  return {
    name: 'legacy-mobile-css-compat',
    enforce: 'post',
    generateBundle(_options, bundle) {
      for (const item of Object.values(bundle)) {
        if (item.type === 'asset' && item.fileName.endsWith('.css') && typeof item.source === 'string') {
          let css = item.source;

          // 1. Convert oklch(L% C H [/ A]) to standard sRGB hex/rgba
          css = css.replace(
            /oklch\(\s*([0-9.]+)(%?)\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.]+)(%?))?\s*\)/g,
            (_m, lVal, lPct, cVal, hVal, aVal, aPct) => {
              const L = lPct === '%' ? parseFloat(lVal) / 100 : parseFloat(lVal);
              const C = parseFloat(cVal);
              const H = parseFloat(hVal);
              let alpha: number | undefined;
              if (aVal !== undefined) {
                alpha = aPct === '%' ? parseFloat(aVal) / 100 : parseFloat(aVal);
              }
              return oklchToSrgb(L, C, H, alpha);
            }
          );

          // 2. Strip ` in oklab` from gradient interpolation (`to bottom right in oklab` -> `to bottom right`)
          css = css.replace(/(to (?:top|bottom|left|right)(?: (?:left|right|top|bottom))?|circle|ellipse|[0-9.]+deg)\s+in oklab/g, '$1');

          item.source = css;
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), legacyMobileCssCompat()],
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
