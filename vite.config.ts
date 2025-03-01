import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/hablaba',
  plugins: [react()],
  server: {
    open: true, // Automatically opens browser
  },
});
