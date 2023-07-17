export * from "./src/variable.js"; // 各种变量

export * from "./src/function/CheckFile.js"; // 检查文件是否存在（数组）
export * from "./src/function/BackslashToForwardSlash.js"; // 反斜杠转正斜杠
export * from "./src/function/DeleteCeateDir.js"; // 删除并创建文件夹

import { BuildHTML } from "./src/function/build/BuildHTML.js"; // 构建 HTML
import { CodeCompression } from "./src/function/build/CodeCompression.js"; // 压缩代码
import { OrganizeCSS } from "./src/function/build/OrganizeCSS.js"; // 整理 HTML 内的 CSS

export var build = {
	BuildHTML,
	CodeCompression,
	OrganizeCSS,
};
