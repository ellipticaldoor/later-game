// prettier-ignore
type Key = // TODO: Validate KeyTypes with this
	'w' | 'a' | 's' | 'd' |
	'i' | 'j' | 'k' | 'l'

type KeyTypes = { [key in Key]: boolean }

interface Keys {
	keys: KeyTypes
	states: {
		framePlayer: boolean
	}
}
