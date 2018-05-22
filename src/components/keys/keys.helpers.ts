import { bind as mouseBind } from 'mousetrap'
import { map } from 'ramda'

export const bindKeyDownUp = (move: object, key: string): void => {
	mouseBind(key, () => (move[key] = true), 'keydown')
	mouseBind(key, () => (move[key] = false), 'keyup')
}

export const bindKeys = (move: object): void => {
	map(key => bindKeyDownUp(move, key), Object.keys(move))
}
