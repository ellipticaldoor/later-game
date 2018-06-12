import { bindInputs, keyMovePlayer, keyMoveCamera } from './inputs.helpers'
import { frameView } from '@client/camera/camera.helpers'
import { camera } from '@client/camera/camera'
import { player } from '@client/player/player'

export const inputs: Inputs = {
	player: {
		move: { up: false, left: false, down: false, right: false },
		keys: { up: 'w', left: 'a', down: 's', right: 'd' },
	},
	camera: {
		move: { up: false, left: false, down: false, right: false },
		keys: { up: 'i', left: 'j', down: 'k', right: 'l' },
	},
}

const gameLoop = (
	delta: number,
	inputs: Inputs,
	renderer: PIXI.Renderer
): void => {
	if (
		inputs.camera.move.up ||
		inputs.camera.move.down ||
		inputs.camera.move.left ||
		inputs.camera.move.right
	) {
		keyMoveCamera(delta, camera, inputs.camera.move)
		player.frame = false
	} else {
		keyMovePlayer(delta, player, inputs.player.move)
		player.frame = true
	}

	if ((player.frame = false)) {
		// Make the camera follow player movement
		frameView(renderer, camera.view, player.sprite.position)
	}
}

const setup = ({ ticker, renderer }: PIXI.Application): Inputs => {
	bindInputs(inputs)
	ticker.add(delta => gameLoop(delta, inputs, renderer))

	return inputs
}

export default setup
