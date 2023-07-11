import fs from 'fs';
import * as cherrio from 'cheerio';

import { format } from "prettier";
import { CodeCompression } from "./CodeCompression.js";
import { ConfigDir } from "../../variable.js";


export function BuildHTML(HTML, debug) {
	const dom = cherrio.load(HTML);

	// 网页图标处理
	let Icon;
	Icon = fs.readFileSync(`${ConfigDir}/favicon.svg`, "utf8");	// 读取图标文件
	Icon = CodeCompression(Icon); // 压缩 svg
	Icon = encodeURIComponent(Icon); // 进行 encodeURI 编码

	dom('head').append(`
	<link rel="icon" href="data:image/svg+xml;charset=utf-8,${Icon}">
	`);

	// 如果是 Debug 则格式化代码
	if (debug == true) {
		HTML = format(dom.html(), {
			parser: 'html',
			tabWidth: 4,
			useTabs: true,
			printWidth: 1000
		});
	}

	return HTML;
}
