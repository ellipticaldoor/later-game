import { moveBody } from 'common/physics/physics.helpers'
import { moveCamera } from 'client/camera/camera.helpers'
import socket from 'client/app/socket.io'

export const inputMoveCamera = (
	delta: number,
	camera: ICamera,
	{ cameraUp, cameraLeft, cameraDown, cameraRight }: IInputs
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
	player: IPlayer,
	{ playerUp, playerLeft, playerDown, playerRight }: IInputs
): boolean => {
	const playerMoved =
		playerUp.state || playerLeft.state || playerDown.state || playerRight.state

	if (playerMoved) {
		const dir: IDirection = {
			x: playerLeft.state ? -1 : playerRight.state ? 1 : 0,
			y: playerUp.state ? -1 : playerDown.state ? 1 : 0,
		}

		moveBody(delta, player.body, player.speed, dir)

		socket.emit('playerMove', dir)
	}

	return playerMoved
}
