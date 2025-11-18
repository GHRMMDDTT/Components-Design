// --- General Type CSS ---
export type CSSElements = CSSColorElement | CSSSizeElement;

// --- Units Absolutes ---
export type PixelsElement = `${number}px`;
export type CentimetersElement = `${number}cm`;
export type MillimetersElement = `${number}mm`;
export type QuarterMillimetersElement = `${number}q`;
export type InchesElement = `${number}in`;
export type PointsElement = `${number}pt`;
export type PicasElement = `${number}pc`;

// --- Units Relatives ---
export type PercentageElement = `${number}%`;
export type EmElement = `${number}em`;
export type RemElement = `${number}rem`;
export type ChElement = `${number}ch`;
export type ExElement = `${number}ex`;
export type CapElement = `${number}cap`;
export type IcElement = `${number}ic`;
export type LhElement = `${number}lh`;
export type RlhElement = `${number}rlh`;

// --- Viewport Units ---
export type ViewPortWidthElement = `${number}vw`;
export type ViewPortHeightElement = `${number}vh`;
export type ViewPortMinElement = `${number}vmin`;
export type ViewPortMaxElement = `${number}vmax`;
export type ViewPortDynamicWidthElement = `${number}dvw`;
export type ViewPortDynamicHeightElement = `${number}dvh`;
export type ViewPortDynamicMinElement = `${number}dvmin`;
export type ViewPortDynamicMaxElement = `${number}dvmax`;
export type ViewPortSmallWidthElement = `${number}svw`;
export type ViewPortLargeWidthElement = `${number}lvw`;

// --- Function CSS ---
export type CalcElement = `${string}.calc`;
export type MinElement = `${string}.min`;
export type MaxElement = `${string}.max`;
export type ClampElement = `${string}.clamp`;

// --- Type Combined General ---
export type CSSSizeElement = CSSSizeNumericElement | CSSSizeMathElement | CSSSizeContentElement;

export type CSSSizeNumericElement =
	| CSSSizeNumeric$StaticElement
	| CSSSizeNumeric$DynamicElement;

export type CSSSizeNumeric$StaticElement =
	| CSSSizeNumeric$1$Element
	| CSSSizeNumeric$2$Element
	| CSSSizeNumeric$4$Element;

export type CSSSizeNumeric$DynamicElement =
	| CSSSizeNumeric$2$AllElement
	| CSSSizeNumeric$4$AllElement;

export type CSSSizeNumeric$2$AllElement =
	| [CSSSizeMath$1$Element, CSSSizeMath$1$Element];

export type CSSSizeNumeric$4$AllElement =
	| [CSSSizeMath$1$Element, CSSSizeMath$1$Element, CSSSizeMath$1$Element, CSSSizeMath$1$Element];

export type CSSSizeNumeric$1$Element =
	| PixelsElement
	| CentimetersElement
	| MillimetersElement
	| QuarterMillimetersElement
	| InchesElement
	| PointsElement
	| PicasElement
	| PercentageElement
	| EmElement
	| RemElement
	| ChElement
	| ExElement
	| ViewPortWidthElement
	| ViewPortHeightElement
	| ViewPortMinElement
	| ViewPortMaxElement
	| ViewPortDynamicWidthElement
	| ViewPortDynamicHeightElement
	| ViewPortDynamicMinElement
	| ViewPortDynamicMaxElement
	| ViewPortSmallWidthElement
	| ViewPortLargeWidthElement;

export type CSSSizeNumeric$2$Element =
	| ([PixelsElement, PixelsElement])
	| ([CentimetersElement, CentimetersElement])
	| ([MillimetersElement, MillimetersElement])
	| ([QuarterMillimetersElement, QuarterMillimetersElement])
	| ([InchesElement, InchesElement])
	| ([PointsElement, PointsElement])
	| ([PicasElement, PicasElement])
	| ([PercentageElement, PercentageElement])
	| ([EmElement, EmElement])
	| ([RemElement, RemElement])
	| ([ChElement, ChElement])
	| ([ExElement, ExElement])
	| ([ViewPortWidthElement, ViewPortWidthElement])
	| ([ViewPortHeightElement, ViewPortHeightElement])
	| ([ViewPortMinElement, ViewPortMinElement])
	| ([ViewPortMaxElement, ViewPortMaxElement])
	| ([ViewPortDynamicWidthElement, ViewPortDynamicWidthElement])
	| ([ViewPortDynamicHeightElement, ViewPortDynamicHeightElement])
	| ([ViewPortDynamicMinElement, ViewPortDynamicMinElement])
	| ([ViewPortDynamicMaxElement, ViewPortDynamicMaxElement])
	| ([ViewPortSmallWidthElement, ViewPortSmallWidthElement])
	| ([ViewPortLargeWidthElement, ViewPortLargeWidthElement])
	| ([CalcElement, CalcElement])
	| ([MinElement, MinElement])
	| ([MaxElement, MaxElement])
	| ([ClampElement, ClampElement]);

export type CSSSizeNumeric$4$Element =
	| ([PixelsElement, PixelsElement, PixelsElement, PixelsElement])
	| ([CentimetersElement, CentimetersElement, CentimetersElement, CentimetersElement])
	| ([MillimetersElement, MillimetersElement, MillimetersElement, MillimetersElement])
	| ([QuarterMillimetersElement, QuarterMillimetersElement, QuarterMillimetersElement, QuarterMillimetersElement])
	| ([InchesElement, InchesElement, InchesElement, InchesElement])
	| ([PointsElement, PointsElement, PointsElement, PointsElement])
	| ([PicasElement, PicasElement, PicasElement, PicasElement])
	| ([PercentageElement, PercentageElement, PercentageElement, PercentageElement])
	| ([EmElement, EmElement, EmElement, EmElement])
	| ([RemElement, RemElement, RemElement, RemElement])
	| ([ChElement, ChElement, ChElement, ChElement])
	| ([ExElement, ExElement, ExElement, ExElement])
	| ([ViewPortWidthElement, ViewPortWidthElement, ViewPortWidthElement, ViewPortWidthElement])
	| ([ViewPortHeightElement, ViewPortHeightElement, ViewPortHeightElement, ViewPortHeightElement])
	| ([ViewPortMinElement, ViewPortMinElement, ViewPortMinElement, ViewPortMinElement])
	| ([ViewPortMaxElement, ViewPortMaxElement, ViewPortMaxElement, ViewPortMaxElement])
	| ([ViewPortDynamicWidthElement, ViewPortDynamicWidthElement, ViewPortDynamicWidthElement, ViewPortDynamicWidthElement])
	| ([ViewPortDynamicHeightElement, ViewPortDynamicHeightElement, ViewPortDynamicHeightElement, ViewPortDynamicHeightElement])
	| ([ViewPortDynamicMinElement, ViewPortDynamicMinElement, ViewPortDynamicMinElement, ViewPortDynamicMinElement])
	| ([ViewPortDynamicMaxElement, ViewPortDynamicMaxElement, ViewPortDynamicMaxElement, ViewPortDynamicMaxElement])
	| ([ViewPortSmallWidthElement, ViewPortSmallWidthElement, ViewPortSmallWidthElement, ViewPortSmallWidthElement])
	| ([ViewPortLargeWidthElement, ViewPortLargeWidthElement, ViewPortLargeWidthElement, ViewPortLargeWidthElement])
	| ([CalcElement, CalcElement, CalcElement, CalcElement])
	| ([MinElement, MinElement, MinElement, MinElement])
	| ([MaxElement, MaxElement, MaxElement, MaxElement])
	| ([ClampElement, ClampElement, ClampElement, ClampElement]);

export type CSSSizeMathElement = 
	| CSSSizeMath$StaticElement
	| CSSSizeMath$DynamicElement;

export type CSSSizeMath$StaticElement =
	| CSSSizeMath$1$Element
	| CSSSizeMath$2$Element
	| CSSSizeMath$4$Element;

export type CSSSizeMath$DynamicElement = 
	| CSSSizeMath$2$AllElement
	| CSSSizeMath$4$AllElement;

export type CSSSizeMath$2$AllElement = 
	| [CSSSizeMath$1$Element, CSSSizeMath$1$Element];

export type CSSSizeMath$4$AllElement = 
	| [CSSSizeMath$1$Element, CSSSizeMath$1$Element, CSSSizeMath$1$Element, CSSSizeMath$1$Element];

export type CSSSizeMath$1$Element =
	| CalcElement
	| MinElement
	| MaxElement
	| ClampElement;

export type CSSSizeMath$2$Element =
	| [CalcElement, CalcElement]
	| [MinElement, MinElement]
	| [MaxElement, MaxElement]
	| [ClampElement, ClampElement];

export type CSSSizeMath$4$Element =
	| [CalcElement, CalcElement, CalcElement, CalcElement]
	| [MinElement, MinElement, MinElement, MinElement]
	| [MaxElement, MaxElement, MaxElement, MaxElement]
	| [ClampElement, ClampElement, ClampElement, ClampElement];

export type CSSSizeContentElement = 
	| "auto"
	| "fit-content"
	| "max-content"
	| "min-content";

// 🎨 --- Color by Name ---
export type NamedColorElement =
	| "black" | "silver" | "gray" | "white" | "maroon" | "red"
	| "purple" | "fuchsia" | "green" | "lime" | "olive" | "yellow"
	| "navy" | "blue" | "teal" | "aqua"
	| "orange" | "aliceblue" | "rebeccapurple"
	| "transparent" | "currentColor"
	| "inherit" | "initial" | "unset";

// --- Hexadecimal ---
export type HexadecimalColorElement = 
	| [Range$HexadecimalElement, Range$HexadecimalElement, Range$HexadecimalElement, Range$HexadecimalElement?];

// --- Function RGB(A)? ---
export type RGBColorElement =
	| [Range$ByteElement, Range$ByteElement, Range$ByteElement, (PercentageElement | Range$FractionalElement | Range$ByteElement)?]
	| [Range$PercentageElement, Range$PercentageElement, Range$PercentageElement, (PercentageElement | Range$FractionalElement | Range$ByteElement)?]

// --- Function HSL(A)? ---
export type HSLColorElement =
	| [Range$CircularElement, Range$PercentageElement, Range$PercentageElement, (Range$CircularElement | Range$FractionalElement)?];


// --- Functions Avanced (CSS Color 4) ---
export type HWBColorElement =
	| [Range$CircularElement, Range$PercentageElement, Range$PercentageElement, 'hwb']
	| [Range$CircularElement, Range$PercentageElement, Range$PercentageElement, (PercentageElement | Range$FractionalElement), 'hwb'];

export type LABColorElement = `${string}.lab`;
export type LCHColorElement = `${string}.lch`;
export type OKLABColorElement = `${string}.oklab`;
export type OKLCHColorElement = `${string}.oklch`;
export type DisplayP3ColorElement = `${string}.display-p3`;
export type SRGBColorElement = `${string}.srgb`;

// --- General Type Color --
export type CSSColorElement =
	| NamedColorElement
	| HexadecimalColorElement
	| RGBColorElement
	| HSLColorElement
	| HWBColorElement
	| LABColorElement
	| LCHColorElement
	| OKLABColorElement
	| OKLCHColorElement
	| DisplayP3ColorElement
	| SRGBColorElement;

export type Range$HexadecimalElement  =
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

export type Range$ByteElement =
	|   '0' |   '1' |   '2' |   '3' |   '4' |   '5' |   '6' |   '7' |   '8' |   '9'
	|  '10' |  '11' |  '12' |  '13' |  '14' |  '15' |  '16' |  '17' |  '18' |  '19'
	|  '20' |  '21' |  '22' |  '23' |  '24' |  '25' |  '26' |  '27' |  '28' |  '29'
	|  '30' |  '31' |  '32' |  '33' |  '34' |  '35' |  '36' |  '37' |  '38' |  '39'
	|  '40' |  '41' |  '42' |  '43' |  '44' |  '45' |  '46' |  '47' |  '48' |  '49'
	|  '50' |  '51' |  '52' |  '53' |  '54' |  '55' |  '56' |  '57' |  '58' |  '59'
	|  '60' |  '61' |  '62' |  '63' |  '64' |  '65' |  '66' |  '67' |  '68' |  '69'
	|  '70' |  '71' |  '72' |  '73' |  '74' |  '75' |  '76' |  '77' |  '78' |  '79'
	|  '80' |  '81' |  '82' |  '83' |  '84' |  '85' |  '86' |  '87' |  '88' |  '89'
	|  '90' |  '91' |  '92' |  '93' |  '94' |  '95' |  '96' |  '97' |  '98' |  '99'
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

export type Range$PercentageElement =
	|   '0%' |   '1%' |   '2%' |   '3%' |   '4%' |   '5%' |   '6%' |   '7%' |   '8%' |   '9%'
	|  '10%' |  '11%' |  '12%' |  '13%' |  '14%' |  '15%' |  '16%' |  '17%' |  '18%' |  '19%'
	|  '20%' |  '21%' |  '22%' |  '23%' |  '24%' |  '25%' |  '26%' |  '27%' |  '28%' |  '29%'
	|  '30%' |  '31%' |  '32%' |  '33%' |  '34%' |  '35%' |  '36%' |  '37%' |  '38%' |  '39%'
	|  '40%' |  '41%' |  '42%' |  '43%' |  '44%' |  '45%' |  '46%' |  '47%' |  '48%' |  '49%'
	|  '50%' |  '51%' |  '52%' |  '53%' |  '54%' |  '55%' |  '56%' |  '57%' |  '58%' |  '59%'
	|  '60%' |  '61%' |  '62%' |  '63%' |  '64%' |  '65%' |  '66%' |  '67%' |  '68%' |  '69%'
	|  '70%' |  '71%' |  '72%' |  '73%' |  '74%' |  '75%' |  '76%' |  '77%' |  '78%' |  '79%'
	|  '80%' |  '81%' |  '82%' |  '83%' |  '84%' |  '85%' |  '86%' |  '87%' |  '88%' |  '89%'
	|  '90%' |  '91%' |  '92%' |  '93%' |  '94%' |  '95%' |  '96%' |  '97%' |  '98%' |  '99%'
	| '100%';

export type Range$FractionalElement =
	| `0.${number}`
	| '1.0';

export type Range$CircularElement =
	|   '0' |   '1' |   '2' |   '3' |   '4' |   '5' |   '6' |   '7' |   '8' |   '9'
	|  '10' |  '11' |  '12' |  '13' |  '14' |  '15' |  '16' |  '17' |  '18' |  '19'
	|  '20' |  '21' |  '22' |  '23' |  '24' |  '25' |  '26' |  '27' |  '28' |  '29'
	|  '30' |  '31' |  '32' |  '33' |  '34' |  '35' |  '36' |  '37' |  '38' |  '39'
	|  '40' |  '41' |  '42' |  '43' |  '44' |  '45' |  '46' |  '47' |  '48' |  '49'
	|  '50' |  '51' |  '52' |  '53' |  '54' |  '55' |  '56' |  '57' |  '58' |  '59'
	|  '60' |  '61' |  '62' |  '63' |  '64' |  '65' |  '66' |  '67' |  '68' |  '69'
	|  '70' |  '71' |  '72' |  '73' |  '74' |  '75' |  '76' |  '77' |  '78' |  '79'
	|  '80' |  '81' |  '82' |  '83' |  '84' |  '85' |  '86' |  '87' |  '88' |  '89'
	|  '90' |  '91' |  '92' |  '93' |  '94' |  '95' |  '96' |  '97' |  '98' |  '99'
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