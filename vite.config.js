import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
<<<<<<< HEAD
  base: "/rosmerta_review_system" // ✅ GitHub Pages needs repo name only
=======
  base: '/rosmerta_review_system/' // ✅ GitHub Pages needs repo name only
>>>>>>> 39eec2e13c7049e428b00ca74b2bc1ba737e3307
});
