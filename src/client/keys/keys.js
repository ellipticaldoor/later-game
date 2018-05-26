import { bindKeys } from './keys.helper'
import { moveCamera, frameCamera } from '@client/camera/camera.helper'
import { moveEntity } from '@client/physics/physics.helper'
import { camera } from '@client/camera/camera'
import { player } from '@client/player/player'

const keys = {
	keys: {
		...{ w: false, a: false, s: false, d: false },
		...{ i: false, j: false, k: false, l: false },
	},
	states: {
		framePlayer: true,
	},
}

const gameLoop = (delta, { keys, states }, renderer) => {
	const { i, j, k, l } = keys

	if (i | j | k | l) {
		states.framePlayer = false

		if (i) moveCamera(delta, camera.view, camera.speed, 0, 1)
		if (j) moveCamera(delta, camera.view, camera.speed, 1, 0)
		if (k) moveCamera(delta, camera.view, camera.speed, 0, -1)
		if (l) moveCamera(delta, camera.view, camera.speed, -1, 0)
	} else {
		const { w, a, s, d } = keys

		if (w) moveEntity(delta, player.body, player.force, 0, -1)
		if (a) moveEntity(delta, player.body, player.force, -1, 0)
		if (s) moveEntity(delta, player.body, player.force, 0, 1)
		if (d) moveEntity(delta, player.body, player.force, 1, 0)

		if (w | a | s | d) states.framePlayer = true
	}

	if (states.framePlayer) {
		// Camera travelling for player
		frameCamera(
			renderer,
			camera.view,
			player.sprite.position.x,
			player.sprite.position.y
		)
	}
}

const setup = ({ ticker, renderer }) => {
	bindKeys(keys.keys)
	ticker.add(delta => gameLoop(delta, keys, renderer))
}

export default setup
