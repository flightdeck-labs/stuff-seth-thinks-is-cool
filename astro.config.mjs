import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.ASTRO_SITE ?? 'https://flightdeck-labs.github.io',
  base: process.env.ASTRO_BASE ?? '/stuff-seth-thinks-is-cool'
});
