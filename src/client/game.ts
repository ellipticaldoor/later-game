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
	socket.on('gameState', (serverGameState: any) => {
		// Delete entities on the client that are not present on the server
		map(key => {
			const serverStateHasProperty = has(key, serverGameState)

			if (!serverStateHasProperty) {
				entitiesCamera.container.removeChild(entities[key].sprite)
				delete entities[key]
			}
		}, Object.keys(entities))

		// Update and create entities
		map(key => {
			const playerState = serverGameState[key]
			const clientStateHasProperty = has(key, entities)

			if (clientStateHasProperty) {
				const playerEntity = entities[key]
				playerEntity.state = playerState

				playerEntity.sprite.position.set(playerState.x, playerState.y)
			} else {
				const playerSprite = spriteOf(characterImage)
				playerSprite.position.set(playerState.x, playerState.y)
				entitiesCamera.container.addChild(playerSprite)

				entities[key] = { sprite: playerSprite, state: playerState }
			}
		}, Object.keys(serverGameState))
	})
}
