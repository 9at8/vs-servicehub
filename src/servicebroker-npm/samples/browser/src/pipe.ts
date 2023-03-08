import { FullDuplexStream } from 'nerdbank-streams'

export const { first: clientStream, second: serverStream } =
	FullDuplexStream.CreatePair()
