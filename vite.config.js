import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Weather_app/',  // <--- your repo name here
  plugins: [react()],
});

