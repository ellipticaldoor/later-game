import { bind as mouseBind } from 'mousetrap'
import { map } from 'ramda'

// TODO: Improve key: string type
export const bindKeyDownUp = (keys: KeyTypes, key: string): void => {
	mouseBind(key, () => (keys[key] = true), 'keydown')
	mouseBind(key, () => (keys[key] = false), 'keyup')
}

export const bindKeys = (keys: KeyTypes): void => {
	map(key => bindKeyDownUp(keys, key), Object.keys(keys))
}
