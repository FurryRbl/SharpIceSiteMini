import "normalize.css/normalize.css";
import "bootstrap/dist/css/bootstrap.css";
import '../css/style.css'
import { SharpIce } from "./utils.js";
import jquery from "jquery";

// 在页面加载完成后执行检测
window.onload = function () {
	if (SharpIce.Utils.isIE()) {
		// 不兼容 IE 浏览器
		document.getElementById("UnsupportedBrowsers").style.display = "unset";
	}
};
