// prettier-ignore
type Key = // TODO: Validate KeyTypes with this
    'w' | 'a' | 's' | 'd' |
    'i' | 'j' | 'k' | 'l'

interface KeyTypes {
	[key: string]: boolean
}

interface Keys {
	keys: KeyTypes
	states: {
		framePlayer: boolean
	}
}
