import React from "react";
import { CSSColor, CSSSizeNumeric$1, CSSSizeNumeric$2, CSSSizeNumeric$4 } from "../css-types";

export class View extends React.Component<ViewBinding, { backgroundColor?: CSSColor }> {
	private constructor(binding: ViewBinding) {
		super(binding)
		this.state = {
			backgroundColor: this.props.backgroundColor
		};
	}

	public static getTypeAttribute(any: any): "single" | "double" | "quadruple" | "double-double" | "quadruple-quadruple" | "nothing" {
		if (typeof any === "string") return "single"

		if (Array.isArray(any)) {
			if (any.length === 2) {
				if (Array.isArray(any[0]) && Array.isArray(any[1])) return "double-double";

				return "double";
			} else if (any.length === 4) {
				if (Array.isArray(any[0]) && Array.isArray(any[1]) && Array.isArray(any[2]) && Array.isArray(any[3])) return "quadruple-quadruple";
				return "quadruple";
			}
		}

		return "nothing";
	}

	public setBackgroundColor(backgroundColor: CSSColor | undefined): void {
		this.setState({ backgroundColor });
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

	protected getPaddingOrMarginAttribute(padding: CSSSizeNumeric$1 | CSSSizeNumeric$2 | CSSSizeNumeric$4 | undefined): string | undefined {
		switch (View.getTypeAttribute(padding)) {
			case 'double':
			case 'quadruple': {
				return (padding as Array<string>).join(" ");
			}
			case "nothing":
			case "quadruple-quadruple":
			case "double-double":
			default: return undefined;
		}
	}

	public getAttribute(): React.CSSProperties {
		const b = (this.props as ViewBinding);

		let mapped: React.CSSProperties = {
			// --- Size ---
			width: b.height,
			height: b.width,

			// --- Padding ---
			padding: this.getPaddingOrMarginAttribute(b.padding),
			margin: this.getPaddingOrMarginAttribute(b.padding),

			backgroundColor: this.getColorAttribute(this.state.backgroundColor),
		};

		return mapped;
	}

	public getPropertier(): React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
		const b = (this.props as ViewBinding);

		return {
			id: b.name,
			style: this.getAttribute(),

			onMouseDown: (event) => {
				if (b !== undefined && b.onPressed !== undefined) {
					b.onPressed(this);
				}
			},
			onMouseUp: (event) => {
				if (b !== undefined && b.onReleased !== undefined) {
					b.onReleased(this);
				}
			}
		}
	}

	public render(): React.ReactElement {
		return <div {...this.getPropertier()} />;
	}

	public static create(width: CSSSizeNumeric$1, height: CSSSizeNumeric$1): View {
		return new View({
			width,
			height,
		});
	}

	public static React(binding: ViewBinding): React.ReactElement {
		return <View {...binding} />
	};
}

export interface ViewBinding {
	// --- Size ---
	width: CSSSizeNumeric$1;
	height: CSSSizeNumeric$1;

	// --- Padding ---
	padding?: CSSSizeNumeric$1 | CSSSizeNumeric$2 | CSSSizeNumeric$4 | undefined;

	// --- Margin ---
	margin?: CSSSizeNumeric$1 | CSSSizeNumeric$2 | CSSSizeNumeric$4 | undefined;

	// --- Id ---
	name?: string;

	// --- color ---
	backgroundColor?: CSSColor | undefined;

	// -- listener --
	onPressed?: (self: View) => void;
	onReleased?: (self: View) => void;
}