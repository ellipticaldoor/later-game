import socket from 'client/app/socket.io'
import { getContainerByName } from 'client/camera/camera.helpers'
import { map, has } from 'ramda'
import characterImage from 'client/assets/img/character_online.png'
import { spriteOf } from 'client/helpers/sprite.helpers'
// import { makeBody, syncSpritePosition } from 'common/physics/physics.helpers'

export const entitiesState = (
	{ engine }: IPhysics,
	{ containers }: ICamera
): any => {
	const entitiesCamera = getContainerByName('entities', containers)
	const entities: any = {}

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

				playerEntity.sprite.position.x = playerState.x
				playerEntity.sprite.position.y = playerState.y

				// playerEntity.body.position.x = playerState.x
				// playerEntity.body.position.y = playerState.y
			} else {
				entities[key] = { sprite: undefined, body: undefined }

				entities[key].state = playerState

				const playerSprite = spriteOf(characterImage)
				playerSprite.position.set(playerState.x, playerState.y)
				entities[key].sprite = playerSprite

				// const playerPoint = { x: playerState.x, y: playerState.y }
				// const playerBody = makeBody(engine, playerPoint, 'player')
				// entities[key].body = playerBody

				entitiesCamera.container.addChild(playerSprite)
			}
		}, Object.keys(serverGameState))
	})

	return { entities }
}

export const entitiesGameLoop = ({ entities }: any): void => {
	// map(({ sprite, body }) => {
	// 	syncSpritePosition(sprite, body)
	// }, entities)
}
