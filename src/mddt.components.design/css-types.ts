
// --- Units Absolutes ---
export type Pixels = `${number}px`;
export type Centimeters = `${number}cm`;
export type Millimeters = `${number}mm`;
export type QuarterMillimeters = `${number}q`;
export type Inches = `${number}in`;
export type Points = `${number}pt`;
export type Picas = `${number}pc`;

// --- Units Relatives ---
export type Percentage = `${number}%`;
export type Em = `${number}em`;
export type Rem = `${number}rem`;
export type Ch = `${number}ch`;
export type Ex = `${number}ex`;
export type Cap = `${number}cap`;
export type Ic = `${number}ic`;
export type Lh = `${number}lh`;
export type Rlh = `${number}rlh`;

// --- Viewport Units ---
export type ViewPortWidth = `${number}vw`;
export type ViewPortHeight = `${number}vh`;
export type ViewPortMin = `${number}vmin`;
export type ViewPortMax = `${number}vmax`;
export type ViewPortDynamicWidth = `${number}dvw`;
export type ViewPortDynamicHeight = `${number}dvh`;
export type ViewPortDynamicMin = `${number}dvmin`;
export type ViewPortDynamicMax = `${number}dvmax`;
export type ViewPortSmallWidth = `${number}svw`;
export type ViewPortLargeWidth = `${number}lvw`;

// --- Function CSS ---
export type Calc = `${string}.calc`;
export type Min = `${string}.min`;
export type Max = `${string}.max`;
export type Clamp = `${string}.clamp`;

// --- Type Combined General ---
export type CSSSize = CSSSizeNumeric;

export type CSSSizeNumeric =
	| CSSSizeNumeric$Static
	| CSSSizeNumeric$Dynamic;

export type CSSSizeNumeric$Static =
	| CSSSizeNumeric$1
	| CSSSizeNumeric$2
	| CSSSizeNumeric$4;

export type CSSSizeNumeric$Dynamic =
	| CSSSizeNumeric$2$All
	| CSSSizeNumeric$4$All;

export type CSSSizeNumeric$2$All =
	| [CSSSizeMath$1, CSSSizeMath$1];

export type CSSSizeNumeric$4$All =
	| [CSSSizeMath$1, CSSSizeMath$1, CSSSizeMath$1, CSSSizeMath$1];

export type CSSSizeNumeric$1 =
	| Pixels
	| Centimeters
	| Millimeters
	| QuarterMillimeters
	| Inches
	| Points
	| Picas
	| Percentage
	| Em
	| Rem
	| Ch
	| Ex
	| ViewPortWidth
	| ViewPortHeight
	| ViewPortMin
	| ViewPortMax
	| ViewPortDynamicWidth
	| ViewPortDynamicHeight
	| ViewPortDynamicMin
	| ViewPortDynamicMax
	| ViewPortSmallWidth
	| ViewPortLargeWidth
	| CSSSizeContent;

export type CSSSizeNumeric$2 =
	| ([Pixels, Pixels])
	| ([Centimeters, Centimeters])
	| ([Millimeters, Millimeters])
	| ([QuarterMillimeters, QuarterMillimeters])
	| ([Inches, Inches])
	| ([Points, Points])
	| ([Picas, Picas])
	| ([Percentage, Percentage])
	| ([Em, Em])
	| ([Rem, Rem])
	| ([Ch, Ch])
	| ([Ex, Ex])
	| ([ViewPortWidth, ViewPortWidth])
	| ([ViewPortHeight, ViewPortHeight])
	| ([ViewPortMin, ViewPortMin])
	| ([ViewPortMax, ViewPortMax])
	| ([ViewPortDynamicWidth, ViewPortDynamicWidth])
	| ([ViewPortDynamicHeight, ViewPortDynamicHeight])
	| ([ViewPortDynamicMin, ViewPortDynamicMin])
	| ([ViewPortDynamicMax, ViewPortDynamicMax])
	| ([ViewPortSmallWidth, ViewPortSmallWidth])
	| ([ViewPortLargeWidth, ViewPortLargeWidth])
	| ([Calc, Calc])
	| ([Min, Min])
	| ([Max, Max])
	| ([Clamp, Clamp])
	| CSSSizeContent;

export type CSSSizeNumeric$4 =
	| ([Pixels, Pixels, Pixels, Pixels])
	| ([Centimeters, Centimeters, Centimeters, Centimeters])
	| ([Millimeters, Millimeters, Millimeters, Millimeters])
	| ([QuarterMillimeters, QuarterMillimeters, QuarterMillimeters, QuarterMillimeters])
	| ([Inches, Inches, Inches, Inches])
	| ([Points, Points, Points, Points])
	| ([Picas, Picas, Picas, Picas])
	| ([Percentage, Percentage, Percentage, Percentage])
	| ([Em, Em, Em, Em])
	| ([Rem, Rem, Rem, Rem])
	| ([Ch, Ch, Ch, Ch])
	| ([Ex, Ex, Ex, Ex])
	| ([ViewPortWidth, ViewPortWidth, ViewPortWidth, ViewPortWidth])
	| ([ViewPortHeight, ViewPortHeight, ViewPortHeight, ViewPortHeight])
	| ([ViewPortMin, ViewPortMin, ViewPortMin, ViewPortMin])
	| ([ViewPortMax, ViewPortMax, ViewPortMax, ViewPortMax])
	| ([ViewPortDynamicWidth, ViewPortDynamicWidth, ViewPortDynamicWidth, ViewPortDynamicWidth])
	| ([ViewPortDynamicHeight, ViewPortDynamicHeight, ViewPortDynamicHeight, ViewPortDynamicHeight])
	| ([ViewPortDynamicMin, ViewPortDynamicMin, ViewPortDynamicMin, ViewPortDynamicMin])
	| ([ViewPortDynamicMax, ViewPortDynamicMax, ViewPortDynamicMax, ViewPortDynamicMax])
	| ([ViewPortSmallWidth, ViewPortSmallWidth, ViewPortSmallWidth, ViewPortSmallWidth])
	| ([ViewPortLargeWidth, ViewPortLargeWidth, ViewPortLargeWidth, ViewPortLargeWidth])
	| ([Calc, Calc, Calc, Calc])
	| ([Min, Min, Min, Min])
	| ([Max, Max, Max, Max])
	| ([Clamp, Clamp, Clamp, Clamp])
	| CSSSizeContent;

export type CSSSizeMath = 
	| CSSSizeMath$Static
	| CSSSizeMath$Dynamic;

export type CSSSizeMath$Static =
	| CSSSizeMath$1
	| CSSSizeMath$2
	| CSSSizeMath$4;

export type CSSSizeMath$Dynamic = 
	| CSSSizeMath$2$All
	| CSSSizeMath$4$All;

export type CSSSizeMath$2$All = 
	| [CSSSizeMath$1, CSSSizeMath$1];

export type CSSSizeMath$4$All = 
	| [CSSSizeMath$1, CSSSizeMath$1, CSSSizeMath$1, CSSSizeMath$1];

export type CSSSizeMath$1 =
	| Calc
	| Min
	| Max
	| Clamp
	| CSSSizeContent;

export type CSSSizeMath$2 =
	| [Calc, Calc]
	| [Min, Min]
	| [Max, Max]
	| [Clamp, Clamp]
	| CSSSizeContent;

export type CSSSizeMath$4 =
	| [Calc, Calc, Calc, Calc]
	| [Min, Min, Min, Min]
	| [Max, Max, Max, Max]
	| [Clamp, Clamp, Clamp, Clamp]
	| CSSSizeContent;

export type CSSSizeContent = 
	| "auto"
	| "fit-content"
	| "max-content"
	| "min-content";

// 🎨 --- Color by Name ---
export type NamedColor =
	| "black" | "silver" | "gray" | "white" | "maroon" | "red"
	| "purple" | "fuchsia" | "green" | "lime" | "olive" | "yellow"
	| "navy" | "blue" | "teal" | "aqua"
	| "orange" | "aliceblue" | "rebeccapurple"
	| "transparent" | "currentColor"
	| "inherit" | "initial" | "unset";

// --- Hexadecimals ---
export type HexadecimalColor = 
	| [Range$Hexadecimal, Range$Hexadecimal, Range$Hexadecimal, Range$Hexadecimal?]
	| [Range$Byte, Range$Byte, Range$Byte, Range$Byte?];

// --- Functions RGB / RGBA ---
export type RGBColor =
	| [Range$Hexadecimal, Range$Hexadecimal, Range$Hexadecimal]
	| [Range$Percentage, Range$Percentage, Range$Percentage, (Range$Percentage | Range$Fractional)?]

// --- Functions HSL / HSLA ---
export type HSLColor =
	| [Range$Circular, Range$Percentage, Range$Percentage, (Range$Circular | Range$Fractional)?];


// --- Functions Avanced (CSS Color 4) ---
export type HWBColor = [Range$Circular, Range$Percentage, Range$Percentage];
export type LABColor = `${string}.lab`;
export type LCHColor = `${string}.lch`;
export type OKLABColor = `${string}.oklab`;
export type OKLCHColor = `${string}.oklch`;
export type DisplayP3Color = `${string}.display-p3`;
export type SRGBColor = `${string}.srgb`;

// --- General export Type for any Color CSS validation --
export type CSSColor =
	| NamedColor
	| HexadecimalColor
	| RGBColor
	| HSLColor
	| HWBColor
	| LABColor
	| LCHColor
	| OKLABColor
	| OKLCHColor
	| DisplayP3Color
	| SRGBColor;

export type Range$Hexadecimal  =
	| '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '0A' | '0B' | '0C' | '0D' | '0E' | '0F'
	| '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '1A' | '1B' | '1C' | '1D' | '1E' | '1F'
	| '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '2A' | '2B' | '2C' | '2D' | '2E' | '2F'
	| '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '3A' | '3B' | '3C' | '3D' | '3E' | '3F'
	| '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '4A' | '4B' | '4C' | '4D' | '4E' | '4F'
	| '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59' | '5A' | '5B' | '5C' | '5D' | '5E' | '5F'
	| '60' | '61' | '62' | '63' | '64' | '65' | '66' | '67' | '68' | '69' | '6A' | '6B' | '6C' | '6D' | '6E' | '6F'
	| '70' | '71' | '72' | '73' | '74' | '75' | '76' | '77' | '78' | '79' | '7A' | '7B' | '7C' | '7D' | '7E' | '7F'
	| '80' | '81' | '82' | '83' | '84' | '85' | '86' | '87' | '88' | '89' | '8A' | '8B' | '8C' | '8D' | '8E' | '8F'
	| '90' | '91' | '92' | '93' | '94' | '95' | '96' | '97' | '98' | '99' | '9A' | '9B' | '9C' | '9D' | '9E' | '9F'
	| 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'AA' | 'AB' | 'AC' | 'AD' | 'AE' | 'AF'
	| 'B0' | 'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'B6' | 'B7' | 'B8' | 'B9' | 'BA' | 'BB' | 'BC' | 'BD' | 'BE' | 'BF'
	| 'C0' | 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6' | 'C7' | 'C8' | 'C9' | 'CA' | 'CB' | 'CC' | 'CD' | 'CE' | 'CF'
	| 'D0' | 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6' | 'D7' | 'D8' | 'D9' | 'DA' | 'DB' | 'DC' | 'DD' | 'DE' | 'DF'
	| 'E0' | 'E1' | 'E2' | 'E3' | 'E4' | 'E5' | 'E6' | 'E7' | 'E8' | 'E9' | 'EA' | 'EB' | 'EC' | 'ED' | 'EE' | 'EF'
	| 'F0' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'FA' | 'FB' | 'FC' | 'FD' | 'FE' | 'FF';

export type Range$Byte =
	| '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
	| '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19'
	| '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29'
	| '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39'
	| '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49'
	| '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59'
	| '60' | '61' | '62' | '63' | '64' | '65' | '66' | '67' | '68' | '69'
	| '70' | '71' | '72' | '73' | '74' | '75' | '76' | '77' | '78' | '79'
	| '80' | '81' | '82' | '83' | '84' | '85' | '86' | '87' | '88' | '89'
	| '90' | '91' | '92' | '93' | '94' | '95' | '96' | '97' | '98' | '99'
	| '100' | '101' | '102' | '103' | '104' | '105' | '106' | '107' | '108' | '109'
	| '110' | '111' | '112' | '113' | '114' | '115' | '116' | '117' | '118' | '119'
	| '120' | '121' | '122' | '123' | '124' | '125' | '126' | '127' | '128' | '129'
	| '130' | '131' | '132' | '133' | '134' | '135' | '136' | '137' | '138' | '139'
	| '140' | '141' | '142' | '143' | '144' | '145' | '146' | '147' | '148' | '149'
	| '150' | '151' | '152' | '153' | '154' | '155' | '156' | '157' | '158' | '159'
	| '160' | '161' | '162' | '163' | '164' | '165' | '166' | '167' | '168' | '169'
	| '170' | '171' | '172' | '173' | '174' | '175' | '176' | '177' | '178' | '179'
	| '180' | '181' | '182' | '183' | '184' | '185' | '186' | '187' | '188' | '189'
	| '190' | '191' | '192' | '193' | '194' | '195' | '196' | '197' | '198' | '199'
	| '200' | '201' | '202' | '203' | '204' | '205' | '206' | '207' | '208' | '209'
	| '210' | '211' | '212' | '213' | '214' | '215' | '216' | '217' | '218' | '219'
	| '220' | '221' | '222' | '223' | '224' | '225' | '226' | '227' | '228' | '229'
	| '230' | '231' | '232' | '233' | '234' | '235' | '236' | '237' | '238' | '239'
	| '240' | '241' | '242' | '243' | '244' | '245' | '246' | '247' | '248' | '249'
	| '250' | '251' | '252' | '253' | '254' | '255';

export type Range$Percentage =
	| '0%' | '1%' | '2%' | '3%' | '4%' | '5%' | '6%' | '7%' | '8%' | '9%'
	| '10%' | '11%' | '12%' | '13%' | '14%' | '15%' | '16%' | '17%' | '18%' | '19%'
	| '20%' | '21%' | '22%' | '23%' | '24%' | '25%' | '26%' | '27%' | '28%' | '29%'
	| '30%' | '31%' | '32%' | '33%' | '34%' | '35%' | '36%' | '37%' | '38%' | '39%'
	| '40%' | '41%' | '42%' | '43%' | '44%' | '45%' | '46%' | '47%' | '48%' | '49%'
	| '50%' | '51%' | '52%' | '53%' | '54%' | '55%' | '56%' | '57%' | '58%' | '59%'
	| '60%' | '61%' | '62%' | '63%' | '64%' | '65%' | '66%' | '67%' | '68%' | '69%'
	| '70%' | '71%' | '72%' | '73%' | '74%' | '75%' | '76%' | '77%' | '78%' | '79%'
	| '80%' | '81%' | '82%' | '83%' | '84%' | '85%' | '86%' | '87%' | '88%' | '89%'
	| '90%' | '91%' | '92%' | '93%' | '94%' | '95%' | '96%' | '97%' | '98%' | '99%'
	| '100%';

export type Range$Fractional =
	| '0.0' | '0.1' | '0.2' | '0.3' | '0.4' | '0.5' | '0.6' | '0.7' | '0.8' | '0.9'
	| '1.0';

export type Range$Circular =
	| '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
	| '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19'
	| '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29'
	| '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39'
	| '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49'
	| '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59'
	| '60' | '61' | '62' | '63' | '64' | '65' | '66' | '67' | '68' | '69'
	| '70' | '71' | '72' | '73' | '74' | '75' | '76' | '77' | '78' | '79'
	| '80' | '81' | '82' | '83' | '84' | '85' | '86' | '87' | '88' | '89'
	| '90' | '91' | '92' | '93' | '94' | '95' | '96' | '97' | '98' | '99'
	| '100' | '101' | '102' | '103' | '104' | '105' | '106' | '107' | '108' | '109'
	| '110' | '111' | '112' | '113' | '114' | '115' | '116' | '117' | '118' | '119'
	| '120' | '121' | '122' | '123' | '124' | '125' | '126' | '127' | '128' | '129'
	| '130' | '131' | '132' | '133' | '134' | '135' | '136' | '137' | '138' | '139'
	| '140' | '141' | '142' | '143' | '144' | '145' | '146' | '147' | '148' | '149'
	| '150' | '151' | '152' | '153' | '154' | '155' | '156' | '157' | '158' | '159'
	| '160' | '161' | '162' | '163' | '164' | '165' | '166' | '167' | '168' | '169'
	| '170' | '171' | '172' | '173' | '174' | '175' | '176' | '177' | '178' | '179'
	| '180' | '181' | '182' | '183' | '184' | '185' | '186' | '187' | '188' | '189'
	| '190' | '191' | '192' | '193' | '194' | '195' | '196' | '197' | '198' | '199'
	| '200' | '201' | '202' | '203' | '204' | '205' | '206' | '207' | '208' | '209'
	| '210' | '211' | '212' | '213' | '214' | '215' | '216' | '217' | '218' | '219'
	| '220' | '221' | '222' | '223' | '224' | '225' | '226' | '227' | '228' | '229'
	| '230' | '231' | '232' | '233' | '234' | '235' | '236' | '237' | '238' | '239'
	| '240' | '241' | '242' | '243' | '244' | '245' | '246' | '247' | '248' | '249'
	| '250' | '251' | '252' | '253' | '254' | '255' | '256' | '257' | '258' | '259'
	| '260' | '261' | '262' | '263' | '264' | '265' | '266' | '267' | '268' | '269'
	| '270' | '271' | '272' | '273' | '274' | '275' | '276' | '277' | '278' | '279'
	| '280' | '281' | '282' | '283' | '284' | '285' | '286' | '287' | '288' | '289'
	| '290' | '291' | '292' | '293' | '294' | '295' | '296' | '297' | '298' | '299'
	| '300' | '301' | '302' | '303' | '304' | '305' | '306' | '307' | '308' | '309'
	| '310' | '311' | '312' | '313' | '314' | '315' | '316' | '317' | '318' | '319'
	| '320' | '321' | '322' | '323' | '324' | '325' | '326' | '327' | '328' | '329'
	| '330' | '331' | '332' | '333' | '334' | '335' | '336' | '337' | '338' | '339'
	| '340' | '341' | '342' | '343' | '344' | '345' | '346' | '347' | '348' | '349'
	| '350' | '351' | '352' | '353' | '354' | '355' | '356' | '357' | '358' | '359'
	| '360';