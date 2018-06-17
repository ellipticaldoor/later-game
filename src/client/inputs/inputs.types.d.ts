interface IInput {
	readonly kind?: 'press' | 'hold' | 'release'
	readonly key: string
	state: boolean
}

interface IInputs {
	[key: string]: IInput
}
