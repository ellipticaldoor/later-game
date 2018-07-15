import { cameraState } from 'client/camera/camera'
import { getContainerByName } from 'client/camera/camera.helpers'
import socket from 'client/socket'
import { map, has } from 'ramda'
import { spriteOf } from 'client/helpers/sprite.helpers'
import characterImage from 'client/assets/img/character_online.png'

export default (pixi: PIXI.Application, connectionInfo: any): void => {
	const camera = cameraState()
	pixi.stage.addChild(camera.view)

	const entitiesCamera = getContainerByName('entities', camera.containers)

	const entities: any = {}

	// TODO: Remove socket logic from here
	socket.on('gameState', (serverGameState: IDictionary<IEntity>) => {
		// Delete entities on the client that are not present on the server
		map(key => {
			const serverStateHasProperty = has(key, serverGameState)

			if (!serverStateHasProperty) {
				entitiesCamera.container.removeChild(entities[key].sprite)
				delete entities[key]
			}
		}, Object.keys(entities))

		// Update and create entities
		map(([key, entityState]) => {
			const clientStateHasProperty = has(key, entities)

			if (clientStateHasProperty) {
				const entity = entities[key]
				entity.state = entityState
				entity.sprite.position.set(entityState.x, entityState.y)
			} else {
				const playerSprite = spriteOf(characterImage)
				playerSprite.position.set(entityState.x, entityState.y)

				entitiesCamera.container.addChild(playerSprite)
				entities[key] = { sprite: playerSprite, state: entityState }
			}
		}, Object.entries(serverGameState))
	})
}
