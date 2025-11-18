import { ReactElement } from "react";
import { CSSColorElement } from "./css-types-elements";

let DIV_ELEMENT_EMPTY = <div />

export function CSS(_: {
	children?: ReactElement<typeof CSSColor> | ReactElement<typeof CSSColor>[];
}): React.ReactElement {
	return DIV_ELEMENT_EMPTY;
}

export function CSSColor(_: {
	children?: ReactElement<typeof CSSColorBackground> | [ReactElement<typeof CSSColorBackground>, ReactElement<typeof CSSColorBackground>];
}): React.ReactElement {
	return DIV_ELEMENT_EMPTY;
}

export function CSSColorBackground(_: {
	color?: CSSColorElement;
}): React.ReactElement {
	return DIV_ELEMENT_EMPTY;
}