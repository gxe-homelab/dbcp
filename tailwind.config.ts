import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['"Geologica"', ...fontFamily.sans]
		},

		extend: {}
	},
	plugins: [require('@tailwindcss/forms')]
} satisfies Config;
