import '../styles/globals.css';

import { NotificationContextProvider } from '../context/notificationContext';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const getLayout = Component.getLayout || (page => page);

	return (
		<SessionProvider session={session}>
			<NotificationContextProvider>
				{getLayout(<Component {...pageProps} />)}
			</NotificationContextProvider>
		</SessionProvider>
	);
}

export default MyApp;
