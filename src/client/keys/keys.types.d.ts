type WASD = 'w' | 'a' | 's' | 'd'
type ToggleWASD = { [key in WASD]: boolean }

type IJKL = 'i' | 'j' | 'k' | 'l'
type ToggleIJKL = { [key in IJKL]: boolean }

type ValidKeys = WASD | IJKL

type ToggleKeys = { [key in ValidKeys]: boolean }

interface Keys {
	keys: ToggleKeys
	states: {
		framePlayer: boolean
	}
}
