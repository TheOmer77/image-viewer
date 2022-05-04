import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { EsLinter, linterPlugin } from 'vite-plugin-linter';
import svgr from 'vite-plugin-svgr';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig(configEnv => ({
  plugins: [
    react(),
    linterPlugin({
      include: ['./src/**/*.js', './src/**/*.jsx'],
      linters: [new EsLinter({ configEnv: configEnv })],
    }),
    svgr({ svgrOptions: { icon: true } }),
    // Needed for @godartm/react-responsive-pinch-zoom-pan to not break Vite
    viteCommonjs(),
  ],
  server: { port: 4000, host: true },
}));
