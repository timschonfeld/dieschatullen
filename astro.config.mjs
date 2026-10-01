// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// SITE_URL setzt der Deploy-Workflow (Staging: https://neu.dieschatullen.de). BASE_PATH nur für Unterordner-Hosting.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://dieschatullen.de',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [sitemap()],
  // Skripte als Dateien ausliefern (nicht inline), damit die CSP ohne 'unsafe-inline' für Skripte auskommt
  vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
});
