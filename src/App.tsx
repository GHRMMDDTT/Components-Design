import './App.css';
import { View } from './mddt/components/design/widgets/view';

/*<CSS>
	<CSSColor>
		<CSSBackgroundColor value={'red'} />
	</CSSColor>
	<CSSPaddingLayout>
		<CSSPadding value={'10px'} />
		<CSSPadding value={'20px'} />
	</CSSPaddingLayout>
	<CSSMarginLayout>
		<CSSMargin value={'50px'} />
	</CSSMarginLayout>
	<CSSAnimation>
		<CSSAnimationRotation>
			<CSSAnimationOnPreapre>
				<To value='180'/>
				<From value='0' />
				<Duration value={'300'} />
			</CSSAnimationOnPreapre>
			<CSSAnimationOnProgress value={(self, animarionInMovement) => {
				if (animarionInMovement.getIs() == '90') {
					animarionInMovement.setRotation('180');
				} // termina como el 270.
			}} />
		</CSSAnimationRotation>
	</CSSAnimation>
</CSS>*/

export default function App() {
	return <View
		width='100px'
		height='100px'
		backgroundColor='red'
		onPressed={function(self: View): void {
			self.setWidth('250px')
		}}
		onReleased={function(self: View): void {
			self.setWidth(undefined)
		}}
		onWidthChanged={
			{
				onWidthChanged: function(old, news): void {
					console.log('salida', old, news)
				}
			}
		} />;
}