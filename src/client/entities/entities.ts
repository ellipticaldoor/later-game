import socket from 'client/app/socket.io'
import { getContainerByName } from 'client/camera/camera.helpers'
import { map, has } from 'ramda'
import characterImage from 'client/assets/img/character.png'
import { spriteOf } from 'client/helpers/sprite.helpers'
import { makeBody, syncSpritePosition } from 'common/physics/physics.helpers'

export const entitiesState = (
	{ engine }: IPhysics,
	{ containers }: ICamera
): any => {
	const entitiesCamera = getContainerByName('entities', containers)
	const states: any = {}
	const entities: any = {}

	socket.on('gameState', (serverGameState: any) => {
		map(key => {
			const clientStateHasProperty = has(key, states)

			if (!clientStateHasProperty) {
				const playerState = serverGameState[key]
				entities[key] = { sprite: undefined, body: undefined }

				const playerSprite = spriteOf(characterImage)
				playerSprite.position.set(playerState.x, playerState.y)
				entities[key].sprite = playerSprite

				const playerPoint = { x: playerState.x, y: playerState.y }
				const playerBody = makeBody(engine, playerPoint, 'player')
				entities[key].body = playerBody

				states[key] = playerState
				entitiesCamera.container.addChild(playerSprite)
			}
		}, Object.keys(serverGameState))
	})

	return { states, entities }
}

export const entitiesGameLoop = ({ entities }: any): void => {
	map(({ sprite, body }) => {
		syncSpritePosition(sprite, body)
	}, entities)
}
