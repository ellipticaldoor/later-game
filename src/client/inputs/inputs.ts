import inputs from './inputs.state'
import { frameView } from '@client/camera/camera.helpers'
import { camera } from '@client/camera/camera'
import { player } from '@client/player/player'
import { inputMovePlayer, inputMoveCamera } from './helpers/inputs.helpers'
import { bindInputEvents } from './helpers/utils.helpers'

const gameLoop = (delta: number, inputs, renderer: PIXI.Renderer) => {
	if (inputMoveCamera(delta, camera, inputs)) {
		player.frame = false
	} else {
		inputMovePlayer(delta, player, inputs)
		player.frame = true
	}

	if (player.frame) {
		// Make the camera follow player movement
		frameView(renderer, camera.view, player.sprite.position)
	}
}

const setup = ({ ticker, renderer }: PIXI.Application): any => {
	bindInputEvents(inputs)
	ticker.add(delta => gameLoop(delta, inputs, renderer))

	return inputs
}

export default setup
