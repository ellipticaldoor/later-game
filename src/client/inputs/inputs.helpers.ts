import * as mousetrap from 'mousetrap'
import { map } from 'ramda'
import { moveBody } from '@client/physics/physics.helpers'
import { moveCamera } from '@client/camera/camera.helpers'

// export const bindKeyDownUp = (toggle: ToggleKeys, key: ValidKeys): void => {
// 	mousetrap.bind(key, () => (toggle[key] = true), 'keydown')
// 	mousetrap.bind(key, () => (toggle[key] = false), 'keyup')
// }

// export const bindKeys = (toggle: ToggleKeys): void => {
// 	const validKeys = Object.keys(toggle) as ValidKeys[]
// 	map(key => bindKeyDownUp(toggle, key), validKeys)

// 	// Reset every key toggle to false when the window gets out of focus
// 	window.onblur = () => map(key => (toggle[key] = false), validKeys)
// }

export const keyMovePlayer = (
	delta: number,
	player: Player,
	move: Move
): void => {
	const dir: Direction = {
		x: move.left ? -1 : move.right ? 1 : 0,
		y: move.up ? -1 : move.down ? 1 : 0,
	}

	moveBody(delta, player.body, player.force, dir)
}

export const keyMoveCamera = (
	delta: number,
	camera: Camera,
	move: Move
): void => {
	const dir: Direction = {
		x: move.left ? -1 : move.right ? 1 : 0,
		y: move.up ? -1 : move.down ? 1 : 0,
	}

	moveCamera(delta, camera.view, camera.speed, dir)
}
