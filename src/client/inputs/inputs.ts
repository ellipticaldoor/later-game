import inputs from './inputs.state'
import { frameView } from '@client/camera/camera.helpers'
import { camera } from '@client/camera/camera'
import { player } from '@client/player/player'
import {
	bindInputEvents,
	inputMovePlayer,
	inputMoveCamera,
} from './inputs.helpers'

const gameLoop = (delta: number, inputs, renderer: PIXI.Renderer) => {
	if (
		inputs.cameraUp.state ||
		inputs.cameraLeft.state ||
		inputs.cameraDown.state ||
		inputs.cameraRight.state
	) {
		inputMoveCamera(delta, camera, {
			up: inputs.cameraUp.state,
			left: inputs.cameraLeft.state,
			down: inputs.cameraDown.state,
			right: inputs.cameraRight.state,
		})
		player.frame = false
	} else {
		if (
			inputs.playerUp.state ||
			inputs.playerLeft.state ||
			inputs.playerDown.state ||
			inputs.playerRight.state
		) {
			inputMovePlayer(delta, player, {
				up: inputs.playerUp.state,
				left: inputs.playerLeft.state,
				down: inputs.playerDown.state,
				right: inputs.playerRight.state,
			})
		}
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
