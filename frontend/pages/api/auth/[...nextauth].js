import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import axios from 'axios';

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
					placeholder: 'example@gmail.com',
				},
				password: { label: 'Password', type: 'password' },
			},

			/*------------------------- Function to handle Sign In of User -------------------------*/

			async authorize(credentials, req) {
				const res = await axios.post(`${process.env.BACKEND_URL}/user/login`, {
					email: credentials.email,
					password: credentials.password,
				});
				if (res.status == 200) return res.data;
				else throw new Error(res.statusText);
			},
		}),
	],
	pages: {
		signIn: '/auth/login',
	},
	session: { strategy: 'jwt' },
	callbacks: {
		jwt: async ({ token, user }) => {
			user && (token.user = user);
			return token;
		},
		session: async ({ session, token }) => {
			const res = await axios.get(
				`${process.env.BACKEND_URL}/user/${token.user._id}`
			);

			session.user = res.data.user ? res.data.user : token.user;
			return session;
		},
	},
});
