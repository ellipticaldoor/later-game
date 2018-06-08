import { bind as mouseBind } from 'mousetrap'
import { map } from 'ramda'
import { moveBody } from '@client/physics/physics.helpers'
import { moveCamera } from '@client/camera/camera.helpers'

export const bindKeyDownUp = (toggle: ToggleKeys, key: ValidKeys): void => {
	mouseBind(key, () => (toggle[key] = true), 'keydown')
	mouseBind(key, () => (toggle[key] = false), 'keyup')
}

export const bindKeys = (toggle: ToggleKeys): void => {
	map(key => bindKeyDownUp(toggle, key), Object.keys(toggle) as ValidKeys[])
}

export const keyMovePlayer = (
	delta: number,
	player: Player,
	toggle: ToggleWASD
): void => {
	const dir: Direction = {
		x: toggle.a ? -1 : toggle.d ? 1 : 0,
		y: toggle.w ? -1 : toggle.s ? 1 : 0,
	}

	moveBody(delta, player.body, player.force, dir)
}

export const keyMoveCamera = (
	delta: number,
	camera: Camera,
	toggle: ToggleIJKL
): void => {
	const dir: Direction = {
		x: toggle.j ? -1 : toggle.l ? 1 : 0,
		y: toggle.i ? -1 : toggle.k ? 1 : 0,
	}

	moveCamera(delta, camera.view, camera.speed, dir)
}
