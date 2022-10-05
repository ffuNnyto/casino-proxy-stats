import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig({

  plugins: [react()],
  define: {
    'process.env': {
      api:'https://stake.com/_api/graphql'
    }
  }
})
