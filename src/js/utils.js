export var SharpIce = {
	Utils: {
		isIE: () => {
			// 判断是否为IE浏览器
			const userAgent = window.navigator.userAgent;
			const msie = userAgent.indexOf("MSIE ");
			const trident = userAgent.indexOf("Trident/");
			return msie > -1 || trident > -1;
		},
	},
};
