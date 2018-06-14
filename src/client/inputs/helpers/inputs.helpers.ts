import { moveBody } from '@client/physics/physics.helpers'
import { moveCamera } from '@client/camera/camera.helpers'

export const inputMoveCamera = (
	delta: number,
	camera: Camera,
	{ cameraUp, cameraLeft, cameraDown, cameraRight }: Inputs
): boolean => {
	const cameraMoved =
		cameraUp.state || cameraLeft.state || cameraDown.state || cameraRight.state

	if (cameraMoved) {
		moveCamera(delta, camera.view, camera.speed, {
			x: cameraLeft.state ? -1 : cameraRight.state ? 1 : 0,
			y: cameraUp.state ? -1 : cameraDown.state ? 1 : 0,
		})
	}

	return cameraMoved
}

export const inputMovePlayer = (
	delta: number,
	player: Player,
	{ playerUp, playerLeft, playerDown, playerRight }: Inputs
): boolean => {
	const playerMoved =
		playerUp.state || playerLeft.state || playerDown.state || playerRight.state

	if (playerMoved) {
		moveBody(delta, player.body, player.speed, {
			x: playerLeft.state ? -1 : playerRight.state ? 1 : 0,
			y: playerUp.state ? -1 : playerDown.state ? 1 : 0,
		})
	}

	return playerMoved
}
