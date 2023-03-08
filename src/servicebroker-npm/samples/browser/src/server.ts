import {
	GlobalBrokeredServiceContainer,
	MultiplexingRelayServiceBroker,
} from '@microsoft/servicehub-framework'
import CancellationToken from 'cancellationtoken'
import { serverStream } from './pipe'
import { ICalculator, Services } from './services'

class Calculator implements ICalculator {
	public add(
		a: number,
		b: number,
		cancellationToken?: CancellationToken
	): Promise<number> {
		return Promise.resolve(a + b)
	}
}

let isServerStarted = false

export async function startServer() {
	if (isServerStarted) {
		return
	}

	isServerStarted = true

	const container = new GlobalBrokeredServiceContainer()

	container.register([Services.calculator])
	container.profferServiceFactory(Services.calculator.descriptor, () =>
		Promise.resolve(new Calculator())
	)

	await MultiplexingRelayServiceBroker.connectToServer(
		container.getFullAccessServiceBroker(),
		serverStream
	)
}
