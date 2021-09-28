module.exports = {
	purge: {
		content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			sans: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
		},
		container: {
			padding: '1rem',
			center: true,
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
