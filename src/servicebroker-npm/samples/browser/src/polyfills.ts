// @ts-ignore
window.process = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	env: { NODE_DEBUG: '' },
	platform: 'win32',
}

import { Buffer } from 'buffer'

window.Buffer = Buffer

// @ts-ignore
window.setImmediate = window.setTimeout
// @ts-ignore
window.clearImmediate = window.clearTimeout
