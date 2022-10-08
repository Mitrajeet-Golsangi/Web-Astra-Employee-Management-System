/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: false,
	env: {
		BACKEND_URL: process.env.BACKEND_URL,
	},
};
