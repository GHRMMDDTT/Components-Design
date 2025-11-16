import React, {  } from "react";
import { CSSColorElement, CSSSizeNumeric$1$Element as CSSSizeNumeric$1$Element, CSSSizeNumeric$2$Element as CSSSizeNumeric$2$Element, CSSSizeNumeric$4$Element as CSSSizeNumeric$4$Element } from "../css-types-elements";

export class View extends React.Component<ViewBinding, {
	width: CSSSizeNumeric$1$Element;
	height: CSSSizeNumeric$1$Element;

	backgroundColor?: CSSColorElement;
	padding?: CSSSizeNumeric$1$Element | CSSSizeNumeric$2$Element | CSSSizeNumeric$4$Element | undefined;
	margin?: CSSSizeNumeric$1$Element | CSSSizeNumeric$2$Element | CSSSizeNumeric$4$Element | undefined;
}> {
	public constructor(binding: ViewBinding) {
		super(binding)
		this.state = {
			width: this.props.width,
			height: this.props.height,
			backgroundColor: this.props.backgroundColor,
			padding: this.props.padding,
			margin: this.props.margin
		};
	}

	public setWidth(width: CSSSizeNumeric$1$Element): void {
		this.setState({ width: width });
	}

	public getWidth(): string {
		return this.state.width;
	}

	public setHeight(height: CSSSizeNumeric$1$Element): void {
		this.setState({ height: height });
	}

	public getHeight(): string {
		return this.state.height;
	}

	public setBackgroundColor(backgroundColor: CSSColorElement | undefined): void {
		this.setState({ backgroundColor: backgroundColor });
	}

	public getBackgroundColor(): string | undefined {
		return this.getColorAttribute(this.state.backgroundColor);
	}

	protected getColorAttribute(color: any): string | undefined {
		function getColorType(color: any): "hexadecimal" | "hsl" | "rgb" | "named" | "unknown" | "advanced" | "hwb" {
			if (typeof color === "string") {
				if (/^(black|silver|gray|white|maroon|red|purple|fuchsia|green|lime|olive|yellow|navy|blue|teal|aqua|orange|aliceblue|rebeccapurple|transparent|currentColor|inherit|initial|unset)$/i.test(color)) {
					return "named";
				}

				if (/^color\(/i.test(color) || /\.(lab|lch|oklab|oklch|display-p3|srgb)$/.test(color)) {
					return "advanced";
				}
			}

			if (Array.isArray(color)) {
				if (
					color.length >= 3 &&
					color.every((v: string) => /^[0-9A-F]{2}$/i.test(v))
				) {
					return "hexadecimal";
				}

				if (
					(
						color.length === 4 &&
						/^\d+$/.test(color[0]) &&
						color[1].endsWith("%") &&
						color[2].endsWith("%") &&
						/^((0.\d+|1.0)|\d{1,3}%)$/.test(color[3])
					) || (
						color.length === 3 &&
						/^\d+$/.test(color[0]) &&
						color[1].endsWith("%") &&
						color[2].endsWith("%")
					)
				) {
					return "hsl";
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
					return "rgb";
				}

				if (
					(
						color.length === 5 &&
						/^\d+$/.test(color[0]) &&
						color[1].endsWith("%") &&
						color[2].endsWith("%") &&
						/^((0.\d+|1.0)|\d+(\.\d+)?%)$/.test(color[3]) &&
						color[4] === "hwb"
					) || (
						color.length === 4 &&
						/^\d+$/.test(color[0]) &&
						color[1].endsWith("%") &&
						color[2].endsWith("%") &&
						color[3] === "hwb"
					)
				) {
					return "hwb";
				}
			}

			return "unknown";
		}

		const type = getColorType(color);

		switch (type) {
			case "named": {
				return color;
			}

			case "hexadecimal": {
				return "#" + color.join("");
			}

			case "rgb": {
				if (color.length === 3)
					return `rgb(${color.join(", ")})`;
				if (color.length === 4)
					return `rgba(${color.join(", ")})`;
				break;
			}

			case "hsl": {
				if (color.length === 3)
					return `hsl(${color.join(", ")})`;
				if (color.length === 4)
					return `hsla(${color.join(", ")})`;
				break;
			}

			case "hwb": {
				if (color.length === 4)
					return `hwb(${color.slice(0, 3).join(" ")})`;
				if (color.length === 5)
					return `hwb(${color.slice(0, 3).join(" ")} / ${color[3]})`;
				break;
			}

			case "advanced": {
				if (/^color\(/i.test(color)) return color;
				if (/\.(lab|lch|oklab|oklch|display-p3|srgb)$/i.test(color)) {
					const name = color.match(/\.(\w+)$/)?.[1];
					if (name) return `color(${name} ${color.replace(/\.\w+$/, "")})`;
				}
				return color;
			}

			case "unknown":
			default: {
				return undefined;
			}
		}
	}

	public setPadding(padding: CSSSizeNumeric$1$Element | CSSSizeNumeric$2$Element | CSSSizeNumeric$4$Element | undefined): void {
		this.setState({ padding: padding });
	}

	public getPadding(): string | undefined {
		return this.getPaddingOrMarginAttribute(this.state.padding);
	}

	public setMargin(margin: CSSSizeNumeric$1$Element | CSSSizeNumeric$2$Element | CSSSizeNumeric$4$Element | undefined): void {
		this.setState({ margin: margin });
	}

	public getMargin(): string | undefined {
		return this.getPaddingOrMarginAttribute(this.state.margin);
	}

	protected getPaddingOrMarginAttribute(padding: CSSSizeNumeric$1$Element | CSSSizeNumeric$2$Element | CSSSizeNumeric$4$Element | undefined): string | undefined {
		switch (View.getTypeAttribute(padding)) {
			case 'double':
			case 'quadruple': {
				return (padding as Array<string>).join(" ");
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

	public getAttribute(): React.CSSProperties {
		const b = (this.props as ViewBinding);

		console.log(this.state.width)

		let mapped: React.CSSProperties = {
			// --- Size ---
			width: this.state.width,
			height: this.state.height,

			// --- Padding ---
			padding: this.getPaddingOrMarginAttribute(this.state.padding),
			margin: this.getPaddingOrMarginAttribute(this.state.margin),

			backgroundColor: this.getColorAttribute(this.state.backgroundColor),
		};

		return mapped;
	}

	public getPropertier(): React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
		const b = (this.props as ViewBinding);

		return {
			id: b.name,
			style: this.getAttribute(),

			onMouseDown: () => {
				if (b !== undefined && b.onPressed !== undefined) {
					b.onPressed(this);
				}
			},
			onMouseUp: () => {
				if (b !== undefined && b.onReleased !== undefined) {
					b.onReleased(this);
				}
			}
		}
	}

	public render(): React.ReactElement {
		return <div {...this.getPropertier()} />;
	}

	public static getTypeAttribute(any: any): "single" | "double" | "quadruple" | "double-double" | "quadruple-quadruple" | "quadruple-double" | "nothing" | "unknwon" {
		if (typeof any === "string") return "single"

		if (Array.isArray(any)) {
			if (any.length === 2) {
				if (Array.isArray(any[0]) && Array.isArray(any[1])) return "double-double";

				return "double";
			} else if (any.length === 4) {
				if (Array.isArray(any[0]) && Array.isArray(any[1]) && Array.isArray(any[2]) && Array.isArray(any[3])) {
					if (any[0].length === 2 && any[1].length === 2 && any[2].length === 2 && any[3].length === 2) return "quadruple-double";
					if (any[0].length === 4 && any[1].length === 4 && any[2].length === 4 && any[3].length === 4) return "quadruple-quadruple";
					return "unknwon";
				}
				return "quadruple";
			}
		}

		return "nothing";
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
	// classed?: ReactElement<ICSS>;

	// --- color ---
	backgroundColor?: CSSColorElement | undefined;

	// -- listener --
	onPressed?: (self: View) => void;
	onReleased?: (self: View) => void;
}