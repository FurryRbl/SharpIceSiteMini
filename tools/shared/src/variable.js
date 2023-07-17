import { BackslashToForwardSlash } from "./function/BackslashToForwardSlash.js";
import fs from "fs";

export var ProjectDir = BackslashToForwardSlash(process.cwd());
export var AssetsDir = `${ProjectDir}/public`;
export var ConfigDir = `${ProjectDir}/config`;
export var CacheDir = `${ProjectDir}/.cache`;
export var BuildDir = `${ProjectDir}/build`;
export var SourceDir = `${ProjectDir}/src`;

export var SitemapTime = fs
	.statSync(`${SourceDir}/index.html`)
	.mtime.toISOString();
