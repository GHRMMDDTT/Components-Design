import { CSS, CSSColor, CSSColorBackground, CSSLayout, CSSMarginLayout, CSSMargin, CSSPadding, CSSPaddingLayout, ICSS } from "./reactor/components/css-types";

export let ThemeLight: { [key: string]: React.ReactElement<ICSS> } = {
    "Mained": (
        <CSS>
            <CSSColor>
                <CSSColorBackground color={'blue'} />
            </CSSColor>
        </CSS>
    )
}