import playerSetup, { player } from './player'
import { camera } from '@client/camera/camera'
import { pixiMock } from '@client/constants/testing'
import { getContainerByName } from '@client/camera/camera.helpers'

const pixi = Object.assign({}, pixiMock)

describe('Test player setup', () => {
	playerSetup(pixi)

	test('A gameloop was added to the ticker', () => {
		expect(pixi.ticker.add).toHaveBeenCalledTimes(1)
	})

	test('Player wass added to camera entities container', () => {
		const entities = getContainerByName('entities', camera.containers)
		expect(entities.container.getChildIndex(player.sprite))
	})
})
