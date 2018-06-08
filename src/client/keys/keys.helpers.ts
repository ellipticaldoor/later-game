import { bind as mouseBind } from 'mousetrap'
import { map } from 'ramda'
import { moveBody } from '@client/physics/physics.helpers'

export const bindKeyDownUp = (keys: ToggleKeys, key: ValidKeys): void => {
	mouseBind(key, () => (keys[key] = true), 'keydown')
	mouseBind(key, () => (keys[key] = false), 'keyup')
}

export const bindKeys = (keys: ToggleKeys): void => {
	map(key => bindKeyDownUp(keys, key), Object.keys(keys) as ValidKeys[])
}

export const keyMovePlayer = (
	delta: number,
	player: Player,
	keys: ToggleWASD
): void => {
	const dir: Direction = { x: 0, y: 0 }

	if (keys.w) dir.y += -1
	if (keys.a) dir.x += -1
	if (keys.s) dir.y += 1
	if (keys.d) dir.x += 1

	moveBody(delta, player.body, player.force, dir)
}
