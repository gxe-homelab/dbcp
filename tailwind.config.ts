import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		fontFamily: {
			sans: ['"Gabarito"', ...fontFamily.sans]
		},

		extend: {}
	},
	plugins: [require('flowbite/plugin')]
} satisfies Config;
