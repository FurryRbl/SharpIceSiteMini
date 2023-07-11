import { minify } from 'html-minifier';

export function CodeCompression(HTML) {
	const minifyOptions = {
		removeComments: true,
		collapseWhitespace: true,
		removeEmptyAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		removeOptionalTags: true,
		minifyURLs: true,
		minifyCSS: true,
		minifyJS: true
	};
	HTML = minify(HTML, minifyOptions); // 压缩代码
	return HTML;
}
