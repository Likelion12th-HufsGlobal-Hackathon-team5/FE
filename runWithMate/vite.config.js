// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Run With Mate PWA App',
        short_name: 'Run With Mate',
        start_url: '/',
        display: 'fullscreen',
        background_color: '#ffffff',
        theme_color: '#217EEF',
        icons: [
          {
            src: '/RWM_PWA_icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/RWM_PWA_icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
