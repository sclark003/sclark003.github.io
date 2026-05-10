import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/sclark003.github.io/',
  server: {
    port: 1234,
  },
});
