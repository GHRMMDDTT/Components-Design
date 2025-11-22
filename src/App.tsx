import React from 'react';
import './App.css';
import { View } from './reactor/widgets/view';
import { useView } from './reactor/hooks/use-view';
import { CanvasInput } from './reactor/widgets/canvas-input';

export default function App(): React.ReactElement {

	return (
		<div>
			<View
				name='Mained'
				width='500px'
				height='100px'
				backgroundColor={'red'}
				// classed={ThemeLight.Mained}
				onPressed={(self: any) => {
					self.setWidth('250px')
				}}
				onReleased={(self: any) => {
					self.setWidth(undefined)
				}}
			/>
			<p>Width of Mained: {useView('Mained')?.getWidth() ?? "Loading..."}!</p>
			<div style={{ padding: 20 }}>
				<h3>Canvas Input Demo</h3>
				<CanvasInput
					placeholder="Type something..."
					width={500}
					height={50}
					fontSize={24}
					borderColor="#ccc"
					focusBorderColor="#0078d7"
				/>
				<div style={{ height: 20 }} />
				<CanvasInput
					placeholder="Type multi-line text..."
					width={500}
					height={100}
					fontSize={20}
					borderColor="#ccc"
					focusBorderColor="#0078d7"
					multiline={true}
				/>
			</div>
		</div>
	)
}