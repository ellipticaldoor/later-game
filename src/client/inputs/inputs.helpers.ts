import * as mousetrap from 'mousetrap'
import { map } from 'ramda'
import { moveBody } from '@client/physics/physics.helpers'
import { moveCamera } from '@client/camera/camera.helpers'

export const bindInputEvents = inputs => {
	map(bindHoldEvent, inputs)

	// Reset inputs state when the window gets out of focus
	window.onblur = () => map(input => (input.state = false), inputs)
}

export const bindHoldEvent = input => {
	mousetrap.bind(input.key, () => (input.state = true), 'keydown')
	mousetrap.bind(input.key, () => (input.state = false), 'keyup')
}

export const inputMovePlayer = (
	delta: number,
	player: Player,
	move: any
): void => {
	const dir: Direction = {
		x: move.left ? -1 : move.right ? 1 : 0,
		y: move.up ? -1 : move.down ? 1 : 0,
	}

	moveBody(delta, player.body, player.force, dir)
}

export const inputMoveCamera = (
	delta: number,
	camera: Camera,
	move: any
): void => {
	const dir: Direction = {
		x: move.left ? -1 : move.right ? 1 : 0,
		y: move.up ? -1 : move.down ? 1 : 0,
	}

	moveCamera(delta, camera.view, camera.speed, dir)
}
