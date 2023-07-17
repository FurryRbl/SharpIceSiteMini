import Critters from "critters";

export function OrganizeCSS(HTML) {
	const critters = new Critters();
	HTML = critters.process(HTML); // 去除无用 CSS
	return HTML;
}
