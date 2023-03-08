import type { Config } from 'jest'

const config: Config = {
	preset: 'jest-puppeteer',

	transform: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'^.+\\.tsx?$': 'ts-jest',
	},
	testRegex: 'test/[^/]+\\.ts$',

	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	collectCoverage: false,
}

export default config
