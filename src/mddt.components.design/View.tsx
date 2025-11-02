import React from "react";
import { CSSColor, CSSSize, CSSSizeNumeric$1, Range$Hexadecimal } from "./css-types";

export function View(binding: ViewBinding): React.JSX.Element {
	return <div id={binding.name} style={new ViewResolvingAttribute(binding).getAttribute()} />
}

class ViewResolvingAttribute {
	private readonly mBinding: ViewBinding;

	public constructor(binding: ViewBinding) {
		this.mBinding = binding;
	}

	protected getColorType(color: any): "hex" | "hsl" | "rgb" | "named" | "unknown" | "advanced" | "hwb" {
		if (typeof color === "string") {
			// Named color o función avanzada
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
				return "hex";
			}
			
			if (
				color.length >= 3 &&
				color.every((v: string) => /^\d{1,3}%?$/.test(v))
			) {
				return "rgb";
			}

			if (
				color.length >= 3 &&
				/^\d+$/.test(color[0]) &&
				color[1].endsWith("%") &&
				color[2].endsWith("%")
			) {
				return "hsl";
			}

			if (
				color.length === 3 &&
				/^\d+$/.test(color[0]) &&
				color[1].endsWith("%") &&
				color[2].endsWith("%")
			) {
				return "hwb";
			}
		}

		return "unknown";
	}

	protected getColorAttribute(color: any): string | undefined {
		const type = this.getColorType(color);

		switch (type) {
			case "named": {
				return color;
			}

			case "hex": {
				return "#" + color.join("");
			}

			case "rgb": {
				if (color.length === 3)
					return `rgb(${color.join(", ")})`;
				if (color.length === 4)
					return `rgba(${color.slice(0, 3).join(", ")}, ${color[3]})`;
				break;
			}

			case "hsl": {
				if (color.length === 3)
					return `hsl(${color[0]}, ${color[1]}, ${color[2]})`;
				if (color.length === 4)
					return `hsla(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
				break;
			}

			case "hwb": {
				return `hwb(${color[0]} ${color[1]} ${color[2]})`;
			}

			case "advanced": {
				if (/^color\(/i.test(color)) return color;
				if (/\.(lab|lch|oklab|oklch|display-p3|srgb)$/i.test(color)) {
					const name = color.match(/\.(\w+)$/)?.[1];
					if (name) return `color(${name} ${color.replace(/\.\w+$/, "")})`;
				}
				return color;
			}

			default: {
				return undefined;
			}
		}
	}

	public getAttribute(): React.CSSProperties {
		const b = this.mBinding;

		let mapped: React.CSSProperties = {
			// --- Size ---
			width: b.height,
			height: b.width,

			color: this.getColorAttribute(b.color)
		};

		return mapped;
	}
}

interface ViewBinding {
	// --- Size ---
	width: CSSSizeNumeric$1;
	height: CSSSizeNumeric$1;

	// --- Id ---
	name?: string;

	// --- color ---
	color?: CSSColor
}