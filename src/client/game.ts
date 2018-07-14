import { cameraState } from 'client/camera/camera'
import socket from 'client/socket'

export default (pixi: PIXI.Application, connectionInfo: any): void => {
	const camera = cameraState()
	pixi.stage.addChild(camera.view)

	console.log(camera)

	socket.on(
		'gameState',
		(gameState: any): void => {
			// console.log(gameState)
		}
	)
}
