interface Input {
	readonly kind?: 'press' | 'hold' | 'release'
	readonly key: string
	state: boolean
}

interface Inputs {
	[key: string]: Input
}
