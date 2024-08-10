import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapterNetlify from '@sveltejs/adapter-netlify'
import adapterStatic from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: process.env.DEPLOY_PRIME_URL ? adapterNetlify() : adapterStatic(),
  },
  preprocess: [vitePreprocess()],
}

export default config
