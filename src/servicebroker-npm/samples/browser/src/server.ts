import {
	GlobalBrokeredServiceContainer,
	MultiplexingRelayServiceBroker,
	RpcEventServer,
} from '@microsoft/servicehub-framework'
import CancellationToken from 'cancellationtoken'
import { EventEmitter } from 'stream'
import { serverStream } from './pipe'
import { CalculatorEventEmitter, ICalculator, Services } from './services'

class Calculator
	extends (EventEmitter as { new (): CalculatorEventEmitter })
	implements ICalculator, RpcEventServer
{
	rpcEventNames = ['add']

	public add(
		a: number,
		b: number,
		cancellationToken?: CancellationToken
	): Promise<number> {
		const result = a + b

		this.emit('add', a, b, result)

		return Promise.resolve(result)
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
