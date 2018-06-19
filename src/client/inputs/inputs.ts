import { playerInputs, cameraInputs } from './inputs.states'
import { frameView } from 'client/camera/camera.helpers'
import { inputMovePlayer, inputMoveCamera } from './helpers/inputs.helpers'

export const inputsState = (): IInputs => ({ ...playerInputs, ...cameraInputs })

export const inputsGameLoop = (
	delta: number,
	inputs: IInputs,
	camera: ICamera,
	player: IPlayer,
	renderer: PIXI.Renderer
): void => {
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
