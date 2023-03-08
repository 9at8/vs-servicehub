import {
	Formatters,
	MessageDelimiters,
	ServiceAudience,
	ServiceJsonRpcDescriptor,
	ServiceMoniker,
	ServiceRegistration,
	ServiceRpcDescriptor,
} from '@microsoft/servicehub-framework'

import CancellationToken from 'cancellationtoken'
import EventEmitter from 'events'
import StrictEventEmitter from 'strict-event-emitter-types/types/src'

export interface IService {
	readonly moniker: ServiceMoniker
	readonly descriptor: ServiceRpcDescriptor
	readonly registration: ServiceRegistration
}

export class Services {
	static calculator: Readonly<IService> = Services.defineLocal('calc')

	private static defineLocal(
		name: string,
		version?: string
	): Readonly<IService> {
		const moniker = { name, version }
		const descriptor = new ServiceJsonRpcDescriptor(
			moniker,
			Formatters.MessagePack,
			MessageDelimiters.BigEndianInt32LengthHeader
		)
		const registration = new ServiceRegistration(
			ServiceAudience.local,
			false
		)
		return Object.freeze({ moniker, descriptor, registration })
	}
}

interface CalculatorEvents {
	add: (one: number, two: number, result: number) => void
}

export type CalculatorEventEmitter = StrictEventEmitter<
	EventEmitter,
	CalculatorEvents
>

export interface ICalculator extends CalculatorEventEmitter {
	add(
		a: number,
		b: number,
		cancellationToken?: CancellationToken
	): Promise<number>
}
