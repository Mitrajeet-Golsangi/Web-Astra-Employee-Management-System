import { withAuth } from 'next-auth/middleware';

export default withAuth({
	pages: {
		signIn: '/auth/login',
	},
});

export const config = {
	matcher: ['/', '/profile/:path*'],
};
