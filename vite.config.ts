import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'


export default defineConfig({

  base: '/React-web-adds-/',

  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})


