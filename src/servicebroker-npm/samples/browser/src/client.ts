import { RemoteServiceBroker } from '@microsoft/servicehub-framework'
import { clientStream } from './pipe'
import { ICalculator, Services } from './services'

let calculatorPromise: Promise<ICalculator | null>
let calculatorRequested = false

export function getCalculator() {
	if (calculatorRequested) {
		return calculatorPromise
	}

	calculatorRequested = true
	return (calculatorPromise = connectAndGetCalculator())
}

async function connectAndGetCalculator() {
	const serviceBroker = await RemoteServiceBroker.connectToMultiplexingDuplex(
		clientStream
	)

	return await serviceBroker.getProxy<ICalculator>(
		Services.calculator.descriptor
	)
}
