import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

var ProjectDir = BackslashToForwardSlash(path.dirname(path.dirname(fileURLToPath(import.meta.url))))
var AssetsDir = `${ProjectDir}/public`;
var SourceDir = `${ProjectDir}/src`;
var BuildDir = `${ProjectDir}/build`;

var SitemapTime = fs.statSync(`${SourceDir}/index.html`).mtime.toISOString();

function CheckFile(filePaths) {
	for (const filePath of filePaths) {
		if (!fs.existsSync(filePath)) {
			throw new Error(`${filePath} 文件不存在！`);
		}
	}
	return true;
}

function BackslashToForwardSlash(String) {
	return String.replace(/\\/g, '/');
}

function NodePackage(PackageName, PackagePath) {
	return `${ProjectDir}/node_modules/${PackageName}/${BackslashToForwardSlash(PackagePath)}`;
}

function BuildNodePackage() {
	var NodeJSPackageSource = `
		<style>
			${fs.readFileSync(NodePackage('bootstrap', 'dist/css/bootstrap.min.css'))}
		</style>
	`
	return NodeJSPackageSource;
}

export {
	// 注释
	ProjectDir, // 项目根目录
	AssetsDir, // 资源目录
	SourceDir, // 源代码目录
	BuildDir, // 构建输出目录
	SitemapTime, // index.html 最后修改时间
	// 函数
	CheckFile, // 检查相关文件是否存在，不存在即阻止程序运行，使用数组
	NodePackage, // 获取 NodeJS 包路径
	BackslashToForwardSlash, // 将反斜杠转化为正斜杠
	BuildNodePackage // 构建 NodeJS 包
};
