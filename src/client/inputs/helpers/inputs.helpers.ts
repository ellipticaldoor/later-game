import { moveBody } from '@client/physics/physics.helpers'
import { moveCamera } from '@client/camera/camera.helpers'

export const inputMoveCamera = (
	delta: number,
	camera: Camera,
	inputs: Inputs
): boolean => {
	const cameraMoved =
		inputs.cameraUp.state ||
		inputs.cameraLeft.state ||
		inputs.cameraDown.state ||
		inputs.cameraRight.state

	if (cameraMoved) {
		moveCamera(delta, camera.view, camera.speed, {
			x: inputs.cameraLeft.state ? -1 : inputs.cameraRight.state ? 1 : 0,
			y: inputs.cameraUp.state ? -1 : inputs.cameraDown.state ? 1 : 0,
		})
	}

	return cameraMoved
}

export const inputMovePlayer = (
	delta: number,
	player: Player,
	inputs: Inputs
): boolean => {
	const playerMoved =
		inputs.playerUp.state ||
		inputs.playerLeft.state ||
		inputs.playerDown.state ||
		inputs.playerRight.state

	if (playerMoved) {
		moveBody(delta, player.body, player.speed, {
			x: inputs.playerLeft.state ? -1 : inputs.playerRight.state ? 1 : 0,
			y: inputs.playerUp.state ? -1 : inputs.playerDown.state ? 1 : 0,
		})
	}

	return playerMoved
}
