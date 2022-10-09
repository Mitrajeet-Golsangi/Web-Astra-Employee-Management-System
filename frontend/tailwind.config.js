/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],

	theme: {
		extend: {},
		backgroundImage: {
			employeeRegistration:
				'url("https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1920")',
			loginBg:
				'url("https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1920")',
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#057AFF',
					secondary: '#463AA1',
					accent: '#C149AD',
					neutral: '#021431',
					'base-100': '#FFFFFF',
					info: '#93E6FB',
					success: '#80CED1',
					warning: '#EFD8BD',
					error: '#E58B8B',
				},
			},
		],
	},
};
