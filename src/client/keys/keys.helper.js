import { bind as mouseBind } from 'mousetrap'
import { map } from 'ramda'

export const bindKeyDownUp = (move, key) => {
	mouseBind(key, () => (move[key] = true), 'keydown')
	mouseBind(key, () => (move[key] = false), 'keyup')
}

export const bindKeys = move => {
	map(key => bindKeyDownUp(move, key), Object.keys(move))
}
