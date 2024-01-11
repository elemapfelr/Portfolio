import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	base: '/aildhauer.github.io/',
	plugins: [sveltekit()]
});
