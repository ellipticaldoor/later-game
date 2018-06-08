import { bindKeys, keyMovePlayer, keyMoveCamera } from './keys.helpers'
import { frameView } from '@client/camera/camera.helpers'
import { camera } from '@client/camera/camera'
import { player } from '@client/player/player'

const keys: Keys = {
	// prettier-ignore
	toggle: {
		w: false, a: false, s: false, d: false,
		i: false, j: false, k: false, l: false,
	},
	states: {
		framePlayer: true,
	},
}

const gameLoop = (
	delta: number,
	{ toggle, states }: Keys,
	renderer: PIXI.Renderer
): void => {
	const { i, j, k, l } = toggle

	if (i || j || k || l) {
		keyMoveCamera(delta, camera, { i, j, k, l })
		states.framePlayer = false
	} else {
		const { w, a, s, d } = toggle
		keyMovePlayer(delta, player, { w, a, s, d })
		states.framePlayer = true
	}

	if (states.framePlayer) {
		// Camera travelling for player
		frameView(renderer, camera.view, player.sprite.position)
	}
}

const setup = ({ ticker, renderer }: PIXI.Application): Keys => {
	bindKeys(keys.toggle)
	ticker.add(delta => gameLoop(delta, keys, renderer))

	return keys
}

export default setup
