import fs from 'fs';

export function CheckFile(filePaths) {
	for (const filePath of filePaths) {
		if (!fs.existsSync(filePath)) {
			throw new Error(`${filePath} 文件不存在！`);
		}
	}
	return true;
}
