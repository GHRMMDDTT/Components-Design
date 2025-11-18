import React from 'react';
import './App.css';
import { View } from './reactor/widgets/view';
import { CSS, CSSColor, CSSColorBackground } from './reactor/components/css-types';

export default function App(): React.ReactElement {
	return (
		<View
			width='100px'
			height='100px'
			backgroundColor='red'
			classed={
				<CSS>
					<CSSColor>
						<CSSColorBackground color={'red'} />
					</CSSColor>
				</CSS>
			}
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
			} />
	);
}