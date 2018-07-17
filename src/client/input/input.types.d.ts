interface IInput {
	readonly kind?: 'press' | 'hold' | 'release'
	readonly key: string
	state: boolean
}

interface IMoveInput {
	up: IInput
	left: IInput
	down: IInput
	right: IInput
}

interface IInputState {
	playerMove: IMoveInput
}
