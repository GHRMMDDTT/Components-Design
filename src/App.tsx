import './App.css';
import { View } from './mddt/components/design/components/view';

export default function App() {
	return <View.React
		width='100px'
		height='200px'
		backgroundColor={'blue'}
		margin={'50px'}
		onPressed={(self) => {
			self.setBackgroundColor("red");
			console.log(`se cambio a: ${self.getBackgroundColor()}`)
		}}
		onReleased={(self) => {
			self.setBackgroundColor("green");
			console.log(`se cambio a: ${self.getBackgroundColor()}`)
		}} />;
}
