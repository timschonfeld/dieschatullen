// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Für die Vorschau auf GitHub Pages setzt der Workflow SITE_URL und BASE_PATH (z. B. /dieschatullen).
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://dieschatullen.de',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [sitemap()],
  // Skripte als Dateien ausliefern (nicht inline), damit die CSP ohne 'unsafe-inline' für Skripte auskommt
  vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
});
