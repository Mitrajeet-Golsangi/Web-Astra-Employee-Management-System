import { signIn, signOut } from 'next-auth/react';
import Router from 'next/router';

import axios from 'axios';

/**
 * Logs in the user in order to continue
 *
 * @param {string} email Email of the User
 * @param {string} password Password of the User
 */
export const login = async (email, password, setMessage) => {
	const res = await signIn('credentials', {
		email: email,
		password: password,
		redirect: false,
	});

	if (res.status !== 200) setMessage('Invalid Credentials !');
	else {
		try {
			Router.push(callbackUrl);
		} catch (_) {
			Router.push('/');
		}
	}
};

export const logout = () => {
	axios.get(`${process.env.BACKEND_URL}/user/logout`);
	signOut({ redirect: false });
	Router.push('/auth/login');
};
