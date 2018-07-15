import { cameraState } from 'client/camera/camera'
import { getContainerByName } from 'client/camera/camera.helpers'
import socket from 'client/socket'
import { updateEntities } from 'client/game/game.helpers'
import { curry } from 'ramda'

export default (pixi: PIXI.Application, connectionInfo: any): void => {
	const camera = cameraState()
	pixi.stage.addChild(camera.view)

	const entitiesCamera = getContainerByName('entities', camera.containers)
	const entitySprites: IDictionary<PIXI.Sprite> = {}
	socket.on('gameState', curry(updateEntities)(entitiesCamera, entitySprites))
}
