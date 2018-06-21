import {
	playerState,
	loadPlayerSprite,
	playerGameLoop,
} from 'client/player/player'
import { cameraState } from 'client/camera/camera'
import { physicsState } from 'client/physics/physics'
import { getContainerByName } from 'client/camera/camera.helpers'

describe('Player setup', () => {
	const physics = physicsState()
	const camera = cameraState()
	const player = playerState(physics)

	test('Player was added to camera entities container', () => {
		loadPlayerSprite(player, camera)
		const entities = getContainerByName('entities', camera.containers)
		expect(entities.container.getChildIndex(player.sprite))
	})

	test('Player is centered in the screen by default', () => {
		expect(player.frame).toBe(true)
	})

	test('Player gameloop updates player position', () => {
		playerGameLoop(player)
		// TODO
	})
})
