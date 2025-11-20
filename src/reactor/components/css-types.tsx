import { CSSProperties, ReactElement } from "react";
import { CSSColorElement, CSSSizeElement } from "./css-types-elements";

let DIV_ELEMENT_EMPTY = <div />

export interface ICSS {
	children?: ReactElement<ICSSColor> | ReactElement<ICSSColor>[];
}

export function CSS(_: ICSS): React.ReactElement {
	return DIV_ELEMENT_EMPTY;
}

// CSS Layout

export interface ICSSLayout {
	children?: ReactElement<ICSSPaddingLayout | ICSSMarginLayout> | ReactElement<ICSSPaddingLayout | ICSSMarginLayout>[];
}

export function CSSLayout(_: ICSSLayout): React.ReactElement {
	return DIV_ELEMENT_EMPTY;
}

export interface ICSSPaddingLayout {
	children: ReactElement<ICSSPadding> | [ReactElement<ICSSPadding>, ReactElement<ICSSPadding>] | [ReactElement<ICSSPadding>, ReactElement<ICSSPadding>, ReactElement<ICSSPadding>, ReactElement<ICSSPadding>];
}

export function CSSPaddingLayout(_: ICSSPaddingLayout): React.ReactElement {
	return DIV_ELEMENT_EMPTY;
}

export interface ICSSMargin {
	value: CSSSizeElement;
}

export function CSSMargin(_: ICSSMargin): React.ReactElement {
	return DIV_ELEMENT_EMPTY;
}

export interface ICSSMarginLayout {
	children: ReactElement<ICSSMargin> | [ReactElement<ICSSMargin>, ReactElement<ICSSMargin>] | [ReactElement<ICSSMargin>, ReactElement<ICSSMargin>, ReactElement<ICSSMargin>, ReactElement<ICSSMargin>];
}

export function CSSMarginLayout(_: ICSSMarginLayout): React.ReactElement {
	return DIV_ELEMENT_EMPTY;
}

export interface ICSSPadding {
	value: CSSSizeElement;
}

export function CSSPadding(_: ICSSPadding): React.ReactElement {
	return DIV_ELEMENT_EMPTY;
}

// CSS Color

export interface ICSSColor {
	children: ReactElement<ICSSColorBackground> | ReactElement<ICSSColorBackground>[];
}

export function CSSColor(_: ICSSColor): React.ReactElement {
	return DIV_ELEMENT_EMPTY;
}

export interface ICSSColorBackground {
	color: CSSColorElement;
}

export function CSSColorBackground(_: ICSSColorBackground) {
	return DIV_ELEMENT_EMPTY;
}