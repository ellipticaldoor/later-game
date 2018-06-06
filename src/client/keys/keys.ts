import { bindKeys } from './keys.helpers'
import { moveCamera, frameView } from '@client/camera/camera.helpers'
import { moveEntity } from '@client/physics/physics.helpers'
import { camera } from '@client/camera/camera'
import { player } from '@client/player/player'

const keys: Keys = {
	// prettier-ignore
	keys: {
		w: false, a: false, s: false, d: false,
		i: false, j: false, k: false, l: false,
	},
	states: {
		framePlayer: true,
	},
}

const gameLoop = (
	delta: number,
	{ keys, states }: Keys,
	renderer: PIXI.Renderer
): void => {
	const { i, j, k, l } = keys

	if (i || j || k || l) {
		states.framePlayer = false

		if (i) moveCamera(delta, camera.view, camera.speed, { x: 0, y: -1 })
		if (j) moveCamera(delta, camera.view, camera.speed, { x: -1, y: 0 })
		if (k) moveCamera(delta, camera.view, camera.speed, { x: 0, y: 1 })
		if (l) moveCamera(delta, camera.view, camera.speed, { x: 1, y: 0 })
	} else {
		const { w, a, s, d } = keys

		if (w) moveEntity(delta, player.body, player.force, { x: 0, y: -1 })
		if (a) moveEntity(delta, player.body, player.force, { x: -1, y: 0 })
		if (s) moveEntity(delta, player.body, player.force, { x: 0, y: 1 })
		if (d) moveEntity(delta, player.body, player.force, { x: 1, y: 0 })

		if (w || a || s || d) states.framePlayer = true
	}

	if (states.framePlayer) {
		// Camera travelling for player
		frameView(renderer, camera.view, player.sprite.position)
	}
}

const setup = ({ ticker, renderer }: PIXI.Application): Keys => {
	bindKeys(keys.keys)
	ticker.add(delta => gameLoop(delta, keys, renderer))

	return keys
}

export default setup
