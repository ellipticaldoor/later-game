import { bind as mouseBind } from 'mousetrap'
import { map } from 'ramda'

export const bindKeyDownUp = (keys: KeyTypes, key: Key): void => {
	mouseBind(key, () => (keys[key] = true), 'keydown')
	mouseBind(key, () => (keys[key] = false), 'keyup')
}

export const bindKeys = (keys: KeyTypes): void => {
	// @ts-ignore
	map((key: Key) => bindKeyDownUp(keys, key), Object.keys(keys))
}
