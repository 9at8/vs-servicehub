import './polyfills'

import { getCalculator } from './client'
import { startServer } from './server'

const first = document.getElementById('first') as HTMLInputElement
const second = document.getElementById('second') as HTMLInputElement
const result = document.getElementById('result') as HTMLInputElement
const equalsButton = document.getElementById('equals') as HTMLButtonElement

startServer()

equalsButton.addEventListener('click', async () => {
	const sum = await adder(Number(first.value), Number(second.value))

	result.value = sum.toString()
})

async function adder(a: number, b: number): Promise<number> {
	const calculator = await getCalculator()

	if (!calculator) {
		throw new Error('Calculator is null')
	}

	return await calculator.add(a, b)
}
