import physicsSetup, { physics } from './physics'
import { pixiMock } from 'client/constants/testing'

const pixi = Object.assign({}, pixiMock)

describe('Physics setup', () => {
	physicsSetup(pixi)

	test('A gameloop was added to the ticker', () => {
		expect(pixi.ticker.add).toHaveBeenCalledTimes(1)
	})

	test('Gravity was disabled', () => {
		expect(physics.engine.world.gravity.y).toBe(0)
	})
})
