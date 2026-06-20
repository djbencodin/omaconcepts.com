import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://omaconcepts.com',
  output: 'static',
  // Preserves /privacy.html, /terms.html, /apps.html, /phoodscout.html exactly —
  // these URLs are already shipped inside the PhoodScout app for App Store/Play review.
  build: { format: 'file' },
  integrations: [
    sitemap({
      // @astrojs/sitemap infers URLs from route patterns, not actual output filenames,
      // so it doesn't know build.format:'file' emits "/apps.html" instead of "/apps".
      // Append .html to match the real files (root stays extensionless).
      serialize(item) {
        const url = new URL(item.url);
        if (url.pathname !== '/' && !url.pathname.endsWith('.html')) {
          url.pathname += '.html';
          item.url = url.toString();
        }
        return item;
      },
    }),
  ],
});
