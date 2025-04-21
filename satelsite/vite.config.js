import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl({
    /** name of certification */
    name: '192.168.1.25',
    /** custom trust domains */
    domains: ['192.168.1.25'],
    /** custom certification directory */
    certDir: './cert',
  })],
})
