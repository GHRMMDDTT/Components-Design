import React from 'react';
import './App.css';
import { View } from './reactor/widgets/view';
import { useView } from './reactor/hooks/use-view';

export default function App(): React.ReactElement {
	const mainedView = useView('Mained');
	const mainedView2 = useView('Mained2');

	return (
		<div>
			<View
				name='Mained'
				width='500px'
				height='100px'
				backgroundColor={'red'}
				// classed={ThemeLight.Mained}
				onPressed={function (self: View): void {
					self.setWidth('250px')
				}}
				onReleased={function (self: View): void {
					self.setWidth(undefined)
				}} />
			<p>Width of Mained: {mainedView?.getWidth() ?? "Loading..."} & Width of Mained2: {mainedView2?.getWidth() ?? "Loading..."}!</p>
		</div>
	)
}