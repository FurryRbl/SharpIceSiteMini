import fs from 'fs-extra';

import { rimrafSync } from 'rimraf';

export function DeleteCeateDir(Directory) {
	if (fs.existsSync(Directory)) {
		rimrafSync(Directory);
	}
	return fs.mkdirSync(Directory);
}
