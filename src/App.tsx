import { Provider } from 'react-redux';
import { store } from './store/store';
import Overlay from './components/Overlay';

function App() {
	return (
		<Provider store={store}>
			<Overlay />
		</Provider>
	);
}

export default App;
