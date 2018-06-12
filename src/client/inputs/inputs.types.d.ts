// Available kind of inputs
type Movements = 'up' | 'down' | 'left' | 'right'
type ValidInputs = Movements
type Move = { [key in Movements]: boolean }

// Key bindings
type WASD = 'w' | 'a' | 's' | 'd'
type IJKL = 'i' | 'j' | 'k' | 'l'
type ValidKeys = WASD | IJKL
type Keys = { [key in ValidInputs]: ValidKeys }

interface Input {
	move: Move
	keys: Keys
}

interface Inputs {
	[key: string]: Input
}
