import { ProjectDir, AssetsDir, SourceDir, BuildDir, SitemapTime, CheckFile, BuildNodePackage } from './shared.js';

import fs from 'fs-extra';
import Critters from 'critters';
import { rimrafSync } from 'rimraf';
import { minify } from 'html-minifier';

console.log(ProjectDir);

async function CodeCompression(FilePaths) {
	const critters = new Critters();
	const minifyOptions = {
		removeComments: true,
		collapseWhitespace: true,
		removeEmptyAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		minifyCSS: true,
		minifyJS: true
	};
	for (const filePath of FilePaths) {
		let HTMLData = fs.readFileSync(filePath, 'utf8');
		HTMLData = await critters.process(HTMLData); // 去除无用 CSS
		HTMLData = minify(HTMLData, minifyOptions); // 压缩代码
		fs.writeFileSync(filePath, HTMLData, 'utf8');
	}
	return true;
}

// 判断核心文件是否存在
CheckFile([
	`${SourceDir}/index.html`,
	`${AssetsDir}/sitemap.xml`
]);

console.log(`
你好 锐冰龙！
\n
项目根目录：${ProjectDir}
构建输出目录：${BuildDir}
index.html 文件最后更新时间：${SitemapTime}
`);

// 创建新的文件夹
if (fs.existsSync(BuildDir)) {
	rimrafSync(BuildDir);
}
fs.mkdirSync(BuildDir);

// 复制文件
fs.copySync(AssetsDir, BuildDir);
fs.copySync(SourceDir, BuildDir);

// 删除调试用的文件夹
rimrafSync(`${BuildDir}/debug`);

// 处理站点地图
{
	const FilePath = `${BuildDir}/sitemap.xml`;
	fs.writeFileSync(FilePath, fs.readFileSync(FilePath, 'utf8').replace('${Time}', SitemapTime), 'utf8');
}

// 构建 index.html 文件
{
	const FilePath = `${BuildDir}/index.html`;
	const injectData = `${BuildNodePackage()}`
	fs.writeFileSync(FilePath, fs.readFileSync(FilePath, 'utf8').replace('</html>', `${injectData}</html>`));
}

// 精简压缩代码
CodeCompression([
	`${BuildDir}/index.html`,
	`${BuildDir}/404.html`
]);
