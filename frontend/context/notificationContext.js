import { useSession } from 'next-auth/react';
import React from 'react';

export const notificationContext = React.createContext({
	message: null,
	setMessage: msg => {},
});

export const NotificationContextProvider = props => {
	const { data: session } = useSession();

	const [message, setMessage] = React.useState(null);

	if (message !== null) setTimeout(() => setMessage(null), 4000);
	return (
		<notificationContext.Provider value={{ message, setMessage }}>
			{props.children}
			<div className="notification-wrapper">
				{message ? (
					<div
						className="notification-div"
						style={{ backgroundColor: '#93E6FB' }}
					>
						{message}
					</div>
				) : null}
				{session !== null ? (
					session?.user.email_verified ? null : (
						<div className="notification-div">Please Verify you Email</div>
					)
				) : null}
			</div>
		</notificationContext.Provider>
	);
};
