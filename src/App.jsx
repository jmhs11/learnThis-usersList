import Button from './components/Button';

const App = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<Button text='Button' handleClick={() => console.log('clicked')} />
		</>
	);
};

export default App;
