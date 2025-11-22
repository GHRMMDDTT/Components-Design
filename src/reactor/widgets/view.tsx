import React, { CSSProperties, ReactElement } from 'react';
import { CSSColorElement, CSSGravityElement, CSSSizeNumeric$1$Element, CSSSizeNumeric$2$Element, CSSSizeNumeric$4$Element } from '../components/css-types-elements';
import { Component } from './widget';
import { CSS, CSSColor, CSSColorBackground, CSSLayout, CSSMargin, CSSMarginLayout, CSSPadding, CSSPaddingLayout, ICSS } from '../components/css-types';

export class View extends Component<ViewBinding> {
	public constructor(binding: ViewBinding) {
		super(binding)
		this.state = binding;
	}


	public componentDidMount(): void {
		if (this.props.name) {
			this.setName(this.props.name);
		}
	}

	public componentDidUpdate(prevProps: ViewBinding): void {
		if (this.props.name !== prevProps.name) {
			if (prevProps.name && View.viewsName[prevProps.name] === this) {
				delete View.viewsName[prevProps.name];
				View.notifyListeners();
			}
			if (this.props.name) {
				this.setName(this.props.name);
			}
		}
	}

	public componentWillUnmount(): void {
		if (this.props.name && View.viewsName[this.props.name] === this) {
			delete View.viewsName[this.props.name];
			View.notifyListeners();
		}
	}

	private static viewsName: { [key: string]: View } = {};
	private static listeners: (() => void)[] = [];

	public static subscribe(listener: () => void): () => void {
		this.listeners.push(listener);
		return () => {
			this.listeners = this.listeners.filter(l => l !== listener);
		}
	}

	private static notifyListeners(): void {
		this.listeners.forEach(listener => listener());
	}

	public static findViewByName(name: string): View | undefined {
		return this.viewsName[name];
	}

	public static findAllViewsByName(name: string): View[] {
		return Object.values(this.viewsName).filter((view) => view.props.name === name);
	}

	public setName(name: string): void {
		this.setState({ name: name });
		if (name) {
			View.viewsName[name] = this;
			View.notifyListeners();
		}
	}

	public setWidth(width: CSSSizeNumeric$1$Element | undefined): void {
		this.setListenerChanged({
			name: ['onWidthChanged', 'width'],
			assignation: {
				value: width,
				type: { whatNormalized: 1 }
			}
		})
	}

	public setOnWidthChanged(onWidthChanged: View.OnWidthChangedListener): void {
		this.setState({ onWidthChanged: onWidthChanged });
	}

	public getWidth(): string | undefined {
		return this.state.width;
	}

	public setHeight(height: CSSSizeNumeric$1$Element): void {
		this.setListenerChanged({
			name: ['onHeightChanged', 'height'],
			assignation: {
				value: height,
				type: { whatNormalized: 1 }
			}
		})
	}

	public setOnHeightChanged(onHeightChanged: View.OnHeightChangedListener): void {
		this.setState({ onHeightChanged: onHeightChanged });
	}

	public getHeight(): string | undefined {
		return this.state.height;
	}

	public setBackgroundColor(backgroundColor: CSSColorElement | undefined): void {
		this.setState({ backgroundColor: backgroundColor ?? this.props.backgroundColor });
	}

	public getBackgroundColor(): string | undefined {
		return this.getColorAttribute(this.state.backgroundColor);
	}

	public setPadding(padding: CSSSizeNumeric$1$Element | CSSSizeNumeric$2$Element | CSSSizeNumeric$4$Element | undefined): void {
		this.setListenerChanged({
			name: ['onPaddingChanged', 'padding'],
			assignation: {
				value: padding,
				type: { whatNormalized: 4 }
			}
		});
	}

	public setOnPaddingChanged(onPaddingChanged: View.OnPaddingChangedListener): void {
		this.setState({ onPaddingChanged: onPaddingChanged });
	}

	public getPadding(): string | undefined {
		return this.getPaddingOrMarginAttribute(this.state.padding);
	}

	public setMargin(margin: CSSSizeNumeric$1$Element | CSSSizeNumeric$2$Element | CSSSizeNumeric$4$Element | undefined): void {
		this.setListenerChanged({
			name: ['onMarginChanged', 'margin'],
			assignation: {
				value: margin,
				type: { whatNormalized: 4 }
			}
		});
	}

	public setOnMarginChanged(onMarginChanged: View.OnMarginChangedListener): void {
		this.setState({ onMarginChanged: onMarginChanged });
	}

	public getMargin(): string | undefined {
		return this.getPaddingOrMarginAttribute(this.state.margin);
	}

	public getAttribute(): React.CSSProperties {
		const b = this.CSSBuilding();

		b.width = this.getWidth() ?? b.width;
		b.height = this.getHeight() ?? b.height;

		b.padding = this.getPadding() ?? b.padding;
		b.margin = this.getMargin() ?? b.margin;

		b.backgroundColor = this.getColorAttribute(this.state.backgroundColor) ?? b.backgroundColor;

		return b;
	}

	public getPropertier(): React.DetailedHTMLProps<React.HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {
		const b = (this.props as ViewBinding);

		return {
			id: b.name ?? this.state.name,
			style: this.getAttribute(),

			tabIndex: 0,
			onMouseDown: () => b.onPressed?.(this), onTouchStart: () => b.onPressed?.(this),
			onMouseUp: () => b.onReleased?.(this), onTouchEnd: () => b.onReleased?.(this),
			onFocus: () => {
				this.setListenerChanged({
					name: ["onFocusChanged"],
					assignation: {
						value: true,
						type: "boolean"
					}
				})
			},
			onBlur: () => {
				this.setListenerChanged({
					name: ["onFocusChanged"],
					assignation: {
						value: false,
						type: "boolean"
					}
				})
			}
		}
	}

	public render(): React.ReactElement {
		return <canvas {...this.getPropertier()} />;
	}

	protected CSSBuilding(): CSSProperties {
		let css: CSSProperties = {};

		if (this.props && this.props.classed) {
			if (this.props.classed.type !== CSS) {
				throw new Error("Only the type '<CSS>...</CSS>' can be used; any other type of value is not valid.");
			}
			const ICSS = this.props.classed?.props;

			this.isArrayAndForEach(ICSS.children, (child) => {
				if (child.type !== CSSColor) {
					throw new Error("Only the type '<CSSColor>...</CSSColor>' can be used; any other type of value is not valid.");
				} else if (child.type !== CSSLayout) {
					throw new Error("Only the type '<CSSLayout>...</CSSLayout>' can be used; any other type of value is not valid.");
				}

				if (child.type === CSSColor) {
					const ICSSColor = child.props;
					this.isArrayAndForEach(ICSSColor.children, (child) => {
						if (child.type !== CSSColorBackground) {
							throw new Error("Only the type '<CSSColorBackground>...</CSSColorBackground>' can be used; any other type of value is not valid.");
						}

						const ICSSColorBackground = child.props;
						css.backgroundColor = this.getColorAttribute(ICSSColorBackground.color);
					}, (element) => {
						if (element.type !== CSSColorBackground) {
							throw new Error("Only the type '<CSSColorBackground>...</CSSColorBackground>' can be used; any other type of value is not valid.");
						}

						const ICSSColorBackground = element.props;
						css.backgroundColor = this.getColorAttribute(ICSSColorBackground.color);
					});
				} else if (child.type === CSSLayout) {
					const ICSSLayout = child.props;
					this.isArrayAndForEach(ICSSLayout.children, (child) => {
						if (child.type !== CSSPaddingLayout) {
							throw new Error("Only the type '<CSSPaddingLayout>...</CSSPaddingLayout>' can be used; any other type of value is not valid.");
						}

						if (child.type === CSSPaddingLayout) {
							const ICSSPaddingLayout = child.props;
							if (Array.isArray(ICSSPaddingLayout.children)) {
								if (child.type !== CSSPadding) {
									throw new Error("Only the type '<CSSPadding>...</CSSPadding>' can be used; any other type of value is not valid.");
								}

								if (ICSSPaddingLayout.children.length === 2) {
									css.padding = this.getPaddingOrMarginAttribute(ICSSPaddingLayout.children);
								} else if (ICSSPaddingLayout.children.length === 4) {
									css.padding = this.getPaddingOrMarginAttribute(ICSSPaddingLayout.children);
								}
							} else {
								css.padding = this.getPaddingOrMarginAttribute(ICSSPaddingLayout.children);
							}
						} else if (child.type === CSSMarginLayout) {
							const ICSSMarginLayout = child.props;
							if (Array.isArray(ICSSMarginLayout.children)) {
								if (child.type !== CSSMargin) {
									throw new Error("Only the type '<CSSMargin>...</CSSMargin>' can be used; any other type of value is not valid.");
								}

								if (ICSSMarginLayout.children.length === 2) {
									css.margin = this.getPaddingOrMarginAttribute(ICSSMarginLayout.children);
								} else if (ICSSMarginLayout.children.length === 4) {
									css.margin = this.getPaddingOrMarginAttribute(ICSSMarginLayout.children);
								}
							} else {
								css.margin = this.getPaddingOrMarginAttribute(ICSSMarginLayout.children);
							}
						}
					});
				}
			})
		}

		return css;
	}

	protected isArrayAndForEach(element: any, callbackArray: (item: any) => void, callbackObject?: (item: any) => void): void {
		if (Array.isArray(element)) {
			element.forEach((item) => {
				callbackArray(item);
			})
		}
		else {
			callbackObject?.(element);
		}
	}

	protected isArray(element: any, callbackArray: (item: Array<any>) => void, callbackObject?: (item: any) => void): void {
		if (Array.isArray(element)) {
			callbackArray(element);
		}
		else {
			callbackObject?.(element);
		}
	}

	protected getColorAttribute(color: any): string | undefined {
		function getColorType(color: any): 'hexadecimal' | 'hsl' | 'rgb' | 'named' | 'unknown' | 'advanced' | 'hwb' {
			if (typeof color === 'string') {
				if (/^(black|silver|gray|white|maroon|red|purple|fuchsia|green|lime|olive|yellow|navy|blue|teal|aqua|orange|aliceblue|rebeccapurple|transparent|currentColor|inherit|initial|unset)$/i.test(color)) {
					return 'named';
				}

				if (/^color\(/i.test(color) || /\.(lab|lch|oklab|oklch|display-p3|srgb)$/.test(color)) {
					return 'advanced';
				}
			}

			if (Array.isArray(color)) {
				if (
					color.length >= 3 &&
					color.every((v: string) => /^[0-9A-F]{2}$/i.test(v))
				) {
					return 'hexadecimal';
				}

				if (
					(
						color.length === 4 &&
						/^\d+$/.test(color[0]) &&
						color[1].endsWith('%') &&
						color[2].endsWith('%') &&
						/^((0.\d+|1.0)|\d{1,3}%)$/.test(color[3])
					) || (
						color.length === 3 &&
						/^\d+$/.test(color[0]) &&
						color[1].endsWith('%') &&
						color[2].endsWith('%')
					)
				) {
					return 'hsl';
				}

				if (
					color.length >= 3 &&
					((
						/^\d{1,3}$/.test(color[0]) &&
						/^\d{1,3}$/.test(color[1]) &&
						/^\d{1,3}$/.test(color[2])
					) || (
							/^\d{1,3}%$/.test(color[0]) &&
							/^\d{1,3}%$/.test(color[1]) &&
							/^\d{1,3}%$/.test(color[2])
						))
				) {
					return 'rgb';
				}

				if (
					(
						color.length === 5 &&
						/^\d+$/.test(color[0]) &&
						color[1].endsWith('%') &&
						color[2].endsWith('%') &&
						/^((0.\d+|1.0)|\d+(\.\d+)?%)$/.test(color[3]) &&
						color[4] === 'hwb'
					) || (
						color.length === 4 &&
						/^\d+$/.test(color[0]) &&
						color[1].endsWith('%') &&
						color[2].endsWith('%') &&
						color[3] === 'hwb'
					)
				) {
					return 'hwb';
				}
			}

			return 'unknown';
		}

		const type = getColorType(color);

		switch (type) {
			case 'named': {
				return color;
			}

			case 'hexadecimal': {
				return '#' + color.join('');
			}

			case 'rgb': {
				if (color.length === 3)
					return `rgb(${color.join(', ')})`;
				if (color.length === 4)
					return `rgba(${color.join(', ')})`;
				break;
			}

			case 'hsl': {
				if (color.length === 3)
					return `hsl(${color.join(', ')})`;
				if (color.length === 4)
					return `hsla(${color.join(', ')})`;
				break;
			}

			case 'hwb': {
				if (color.length === 4)
					return `hwb(${color.slice(0, 3).join(' ')})`;
				if (color.length === 5)
					return `hwb(${color.slice(0, 3).join(' ')} / ${color[3]})`;
				break;
			}

			case 'advanced': {
				if (/^color\(/i.test(color)) return color;
				if (/\.(lab|lch|oklab|oklch|display-p3|srgb)$/i.test(color)) {
					const name = color.match(/\.(\w+)$/)?.[1];
					if (name) return `color(${name} ${color.replace(/\.\w+$/, '')})`;
				}
				return color;
			}

			case 'unknown':
			default: {
				return undefined;
			}
		}
	}

	protected getPaddingOrMarginAttribute(padding: CSSSizeNumeric$1$Element | CSSSizeNumeric$2$Element | CSSSizeNumeric$4$Element | undefined): string | undefined {
		switch (View.getTypeAttribute(padding)) {
			case 'double':
			case 'quadruple': {
				return (padding as Array<string>).join(' ');
			}

			case 'single': {
				return padding as string;
			}

			case 'nothing':
			case 'quadruple-quadruple':
			case 'quadruple-double':
			case 'double-double':
			default: return undefined;

			case 'unknwon':
		}
	}

	protected setListenerChanged(_: {
		name: [keyof ViewBinding, keyof ViewBinding] | [keyof ViewBinding],
		assignation: {
			value: any | undefined,
			type: "boolean" | {
				whatNormalized: 1 | 2 | 4
			}
		}
	}) {
		if (_.assignation.type === "boolean") {
			const [keyListener,] = _.name;

			const oldNormalized = _.assignation.value;

			const listenerObj = this.state[keyListener] as Record<string, Function> | undefined;
			const listenerFn = listenerObj?.[keyListener as string];

			if (typeof listenerFn === 'function') {
				listenerFn(oldNormalized);
			}
		} else {
			if (_.name[0] && _.name[1]) {
				const [keyListener, keyValue] = _.name;

				const normalize = (_value: any, type: 1 | 2 | 4) => {
					switch (type) {
						case 4: return this.normalize$4(_value);
						case 2: return this.normalize$2(_value);
						case 1: return _value;
						default: return _value;
					}
				};

				const oldNormalized = normalize(this.state[keyValue], _.assignation.type.whatNormalized);
				const newNormalized = normalize(_.assignation.value ?? this.props[keyValue], _.assignation.type.whatNormalized);

				this.setState(
					{ [keyValue]: newNormalized } as unknown as Partial<ViewBinding>,
					() => {
						const listenerObj = this.state[keyListener] as Record<string, Function> | undefined;
						const listenerFn = listenerObj?.[keyListener as string];

						if (typeof listenerFn === 'function') {
							listenerFn(oldNormalized, newNormalized);
						}
					}
				);
			}
		}
	}

	private normalize$4(value: any | undefined): [string, string, string, string] {
		if (value === undefined || value === null) {
			return ['0px', '0px', '0px', '0px'];
		}

		if (typeof value === 'string') {
			return [value, value, value, value];
		}

		if (Array.isArray(value)) {
			switch (value.length) {
				case 2:
					return [value[0], value[1], value[0], value[1]];
				case 4:
					return [value[0], value[1], value[2], value[3]];
				default:
					return ['0px', '0px', '0px', '0px'];
			}
		}

		return ['0px', '0px', '0px', '0px'];
	}

	private normalize$2(value: any | undefined): [string, string] {
		if (value === undefined || value === null) {
			return ['0px', '0px'];
		}

		if (typeof value === 'string') {
			return [value, value];
		}

		if (Array.isArray(value)) {
			switch (value.length) {
				case 2:
					return [value[0], value[1]];
				default:
					return ['0px', '0px'];
			}
		}

		return ['0px', '0px'];
	}

	public static getTypeAttribute(any: any): 'single' | 'double' | 'quadruple' | 'double-double' | 'quadruple-quadruple' | 'quadruple-double' | 'nothing' | 'unknwon' {
		if (typeof any === 'string') return 'single'

		if (Array.isArray(any)) {
			if (any.length === 2) {
				if (Array.isArray(any[0]) && Array.isArray(any[1])) return 'double-double';

				return 'double';
			} else if (any.length === 4) {
				if (Array.isArray(any[0]) && Array.isArray(any[1]) && Array.isArray(any[2]) && Array.isArray(any[3])) {
					if (any[0].length === 2 && any[1].length === 2 && any[2].length === 2 && any[3].length === 2) return 'quadruple-double';
					if (any[0].length === 4 && any[1].length === 4 && any[2].length === 4 && any[3].length === 4) return 'quadruple-quadruple';
					return 'unknwon';
				}
				return 'quadruple';
			}
		}

		return 'nothing';
	}
}

export namespace View {
	export interface OnWidthChangedListener {
		onWidthChanged(olded: string, newes: string): void;
	}

	export interface OnPaddingChangedListener {
		onPaddingChanged(olded: [string, string, string, string], newes: [string, string, string, string]): void;
	}

	export interface OnMarginChangedListener {
		onMarginChanged(olded: [string, string, string, string], newes: [string, string, string, string]): void;
	}

	export interface OnFocusChangedListener {
		onFocusChanged(isFocused: boolean): void;
	}

	export interface OnHeightChangedListener {
		onHeightChanged(olded: string, newes: string): void;
	}
}

export interface ViewBinding {
	// --- Size ---
	width: CSSSizeNumeric$1$Element;
	height: CSSSizeNumeric$1$Element;

	// --- Layout ---
	padding?: CSSSizeNumeric$1$Element | CSSSizeNumeric$2$Element | CSSSizeNumeric$4$Element | undefined;
	margin?: CSSSizeNumeric$1$Element | CSSSizeNumeric$2$Element | CSSSizeNumeric$4$Element | undefined;

	// --- Id ---
	name?: string;

	// --- class ---
	classed?: ReactElement<ICSS>;

	// --- color ---
	backgroundColor?: CSSColorElement | undefined;

	// -- listener --
	onPressed?: (self: View) => void;
	onReleased?: (self: View) => void;

	onWidthChanged?: View.OnWidthChangedListener;
	onHeightChanged?: View.OnHeightChangedListener;
	onPaddingChanged?: View.OnPaddingChangedListener;
	onMarginChanged?: View.OnMarginChangedListener;
	onFocusChanged?: View.OnFocusChangedListener;
}