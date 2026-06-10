// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://binarybrains-club.github.io',
  base: '/resources-hub',

  vite: {
    plugins: [tailwindcss()],
  },
});

