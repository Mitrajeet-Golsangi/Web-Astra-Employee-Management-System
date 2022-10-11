import '../styles/globals.css';

import { NotificationContextProvider } from '../context/notificationContext';
import { SessionProvider } from 'next-auth/react';

import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
	
NProgress.configure({
	minimum: 0.3,
	easing: 'ease',
	speed: 800,
	showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
