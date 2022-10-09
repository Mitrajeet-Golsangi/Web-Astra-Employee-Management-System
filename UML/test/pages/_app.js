import '../styles/globals.css';

import { store } from '../redux/store';
import { Provider } from 'react-redux';

import { NotificationContextProvider } from '../context/notificationContext';

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout ?? (page => page);

	return (
		<Provider store={store}>
			<NotificationContextProvider>
				{getLayout(<Component {...pageProps} />)};
			</NotificationContextProvider>
		</Provider>
	);
}

export default MyApp;
