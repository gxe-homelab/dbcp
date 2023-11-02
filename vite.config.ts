import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import webfontDownload from 'vite-plugin-webfont-dl';

export default defineConfig({
	plugins: [
		sveltekit(),
		webfontDownload([
			'https://fonts.googleapis.com/css2?family=Geologica:wght@100;200;300;400;500;600;700;800;900&display=swap'
		])
	],

	build: {
		cssMinify: 'lightningcss',
		minify: 'terser'
	}
});
