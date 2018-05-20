import Mousetrap from 'mousetrap'
import { map } from 'ramda'

export const bindKeyDownUp = (move, key) => {
	Mousetrap.bind(key, () => (move[key] = true), 'keydown')
	Mousetrap.bind(key, () => (move[key] = false), 'keyup')
}

export const bindKeys = move => {
	map(key => bindKeyDownUp(move, key), Object.keys(move))
}
