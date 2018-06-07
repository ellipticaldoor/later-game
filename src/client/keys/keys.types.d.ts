// prettier-ignore
type Key =
	'w' | 'a' | 's' | 'd' |
	'i' | 'j' | 'k' | 'l'

type KeyTypes = { [key in Key]: boolean }

interface Keys {
	keys: KeyTypes
	states: {
		framePlayer: boolean
	}
}
