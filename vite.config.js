import { defineConfig } from 'vite';
import { build } from './tools/shared/shared.js';

export default defineConfig({
	root: 'src/',
	base: '/',
	server: {
		host: true,
		port: 8050,
		strictPort: true
	},
	build: {
		outDir: '../.cache'
	},
	plugins: [
		{
			name: 'inject',
			transformIndexHtml(html) {
				return build.BuildHTML(html, true);
			}
		}
	]
});
