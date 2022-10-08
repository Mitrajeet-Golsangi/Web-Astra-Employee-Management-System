import '../styles/globals.css';

import { store } from '../redux/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout ?? (page => page);

	return (
		<Provider store={store}>
			{getLayout(<Component {...pageProps} />)};
		</Provider>
	);
}

export default MyApp;
