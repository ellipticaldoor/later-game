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
		const dir: Direction = { x: 0, y: 0 }

		if (i) dir.y += -1
		if (j) dir.x += -1
		if (k) dir.y += 1
		if (l) dir.x += 1

		moveCamera(delta, camera.view, camera.speed, dir)
		states.framePlayer = false
	} else {
		const { w, a, s, d } = keys
		const dir: Direction = { x: 0, y: 0 }

		if (w) dir.y += -1
		if (a) dir.x += -1
		if (s) dir.y += 1
		if (d) dir.x += 1

		moveEntity(delta, player.body, player.force, dir)
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
