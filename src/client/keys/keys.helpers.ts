import { bind as mouseBind } from 'mousetrap'
import { map } from 'ramda'
import { moveBody } from '@client/physics/physics.helpers'
import { moveCamera } from '@client/camera/camera.helpers'

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
	const dir: Direction = {
		x: keys.a ? -1 : keys.d ? 1 : 0,
		y: keys.w ? -1 : keys.s ? 1 : 0,
	}

	moveBody(delta, player.body, player.force, dir)
}

export const keyMoveCamera = (
	delta: number,
	camera: Camera,
	keys: ToggleIJKL
): void => {
	const dir: Direction = {
		x: keys.j ? -1 : keys.l ? 1 : 0,
		y: keys.i ? -1 : keys.k ? 1 : 0,
	}

	moveCamera(delta, camera.view, camera.speed, dir)
}
