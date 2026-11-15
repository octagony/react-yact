import alias from "@rollup/plugin-alias";
import typescript from "@rollup/plugin-typescript";
import { fileURLToPath } from 'node:url';

export default {
	input: 'src/index.ts',
	external: /^react/,
	output: [
		{ file: 'dist/index.cjs', format: 'cjs', exports: 'named', sourcemap: true },
		{ file: 'dist/index.mjs', format: 'es', sourcemap: true },
	],
	plugins: [typescript({ tsconfig: './tsconfig.json' }), alias({
		entries: [
			{
				find: '@',
				replacement: fileURLToPath(new URL('./src', import.meta.url))
			}
		]
	})],
};