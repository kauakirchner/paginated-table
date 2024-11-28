import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

const config = [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ languageOptions: { globals: globals.browser } },
	{
		...pluginJs.configs.recommended,
		rules: {
			'no-console': ['error', { allow: ['warn', 'error'] }]
		}
	},
	...tseslint.configs.recommended,
	{
		...pluginReact.configs.flat.recommended,
		rules: {
			'react-in-jsx-scope': 'off'
		}
	}
]

export default config;