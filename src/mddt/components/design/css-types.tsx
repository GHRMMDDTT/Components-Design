import { ReactElement } from "react";
import { CSSColorElement } from "./css-types-elements";

let DIV_ELEMENT_EMPTY = <div />

interface ICSS {
	children: ReactElement<ICSSColor> | ReactElement<ICSSColor>[]
}

interface ICSSColor {
	value: CSSColorElement;
}

export function CSS(_: ICSS): React.JSX.Element {
	return DIV_ELEMENT_EMPTY;
}

export function CSSColor(_: ICSSColor): React.JSX.Element {
	return DIV_ELEMENT_EMPTY;
}