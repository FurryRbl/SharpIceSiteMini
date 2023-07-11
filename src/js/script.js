import 'bootstrap/dist/css/bootstrap.css';
import jquery from 'jquery';

function isIE() {	// 判断是否为IE浏览器
	const userAgent = window.navigator.userAgent;
	const msie = userAgent.indexOf('MSIE ');
	const trident = userAgent.indexOf('Trident/');
	return (msie > -1 || trident > -1);
}

// 在页面加载完成后执行检测
window.onload = function () {
	document.getElementById("notEnabledJavaScript").style.display = "none"; // 不支持或未启用 JavaScript
	if (isIE()) {// 不兼容 IE 浏览器
		document.getElementById("UnsupportedBrowsers").style.display = "unset";
	}
};
