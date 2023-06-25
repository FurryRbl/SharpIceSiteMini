import { defineConfig } from 'vite';
import { NodePackage, BuildNodePackage } from './tools/shared.js';
import fs from 'fs';

export default defineConfig({
	root: 'src/',
	base: '/',
	server: {
		host: true,
		port: 8050,
		strictPort: true
	},
	plugins: [
		{
			name: 'inject-debug',
			transformIndexHtml(html) {
				const bootstrapData = fs.readFileSync(NodePackage('bootstrap', 'dist/css/bootstrap.min.css'));

				const injectData = `
				<debug style="display: none;">
					${BuildNodePackage()}
				</debug>
				`;
				return html.replace('</html>', `${injectData}</html>`);
			}
		}
	]
});
