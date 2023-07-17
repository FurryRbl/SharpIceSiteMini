import {
	ProjectDir,
	CacheDir,
	AssetsDir,
	SourceDir,
	BuildDir,
	SitemapTime,
	DeleteCeateDir,
	CheckFile,
	build,
} from "./shared/shared.js";

import fs from "fs-extra";
import * as cherrio from "cheerio";

import { rimrafSync } from "rimraf";
import { build as ViteBuild } from "vite";

async function Build(HTMLFilesDir) {
	for (const HTMLFileDir of HTMLFilesDir) {
		let HTML = fs.readFileSync(HTMLFileDir, "utf8");
		HTML = await build.OrganizeCSS(HTML); // 精简 JavaScript
		HTML = build.CodeCompression(HTML); // 压缩
		fs.writeFileSync(HTMLFileDir, HTML, "utf8");
	}
	return true;
}

// 判断核心文件是否存在
CheckFile([
	`${SourceDir}/index.html`,
	`${SourceDir}/404.html`,
	`${AssetsDir}/sitemap.xml`,
]);

console.log(`
	项目根目录：${ProjectDir}
	构建输出目录：${BuildDir}
	index.html 文件最后更新时间：${SitemapTime}
`);

// 创建文件夹
DeleteCeateDir(BuildDir);
DeleteCeateDir(CacheDir);

// 复制文件
fs.copySync(AssetsDir, BuildDir);
fs.copySync(SourceDir, BuildDir);

// 删除相关文件
rimrafSync(`${BuildDir}/js`);
rimrafSync(`${BuildDir}/css`);

// 处理站点地图
{
	const FilePath = `${BuildDir}/sitemap.xml`;
	fs.writeFileSync(
		FilePath,
		fs.readFileSync(FilePath, "utf8").replace("${Time}", SitemapTime),
		"utf8"
	);
}

const IndexHTMLSource = await ViteBuild(); // 运行 Vite 构建 Index.html 文件

{
	// 处理并写入 index.html 文件
	const dom = cherrio.load(IndexHTMLSource.output[2].source);
	dom("head script[src]").remove(); // 删除外部引用的 JavaScript 文件
	dom("head link[rel]").remove(); // 删除外部引用的 CSS 文件
	dom("head").append(`
		<style>
			${IndexHTMLSource.output[1].source}
		</style>
		<script>
			${IndexHTMLSource.output[0].code}
		</script>
	`);
	fs.writeFileSync(`${BuildDir}/index.html`, dom.html(), "utf8");
}

Build([`${BuildDir}/index.html`, `${BuildDir}/404.html`]);
