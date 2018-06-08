import { bindKeys, keyMovePlayer, keyMoveCamera } from './keys.helpers'
import { frameView } from '@client/camera/camera.helpers'
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
		keyMoveCamera(delta, camera, { i, j, k, l })
		states.framePlayer = false
	} else {
		const { w, a, s, d } = keys
		keyMovePlayer(delta, player, { w, a, s, d })
		states.framePlayer = true
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
