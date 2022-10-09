import { validateConfig } from 'next/dist/server/config-shared';

export const isEmpty = obj => Object.keys(obj).length === 0;

export const reloadSession = () => {
	const event = new Event('visibilitychange');
	document.dispatchEvent(event);
};

export const isEmail = str =>
	str.match(
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
	)
		? true
		: false;
