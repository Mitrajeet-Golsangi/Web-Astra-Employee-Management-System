/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: false,
	env: {
		BACKEND_URL: process.env.BACKEND_URL,
	},
	images: { domains: ['i.imgur.com'] },
};

module.exports = nextConfig;
