import { Render } from 'matter-js'
import physicsSetup from './physics'
import { pixiMock } from '@client/constants/testing'

// @ts-ignore
const pixi: PIXI.Application = { ...pixiMock }

describe('Test physics setup', () => {
	const physics = physicsSetup(pixi)

	test('A gameloop was added to the ticker', () => {
		expect(pixi.ticker.add).toHaveBeenCalledTimes(1)
	})

	test('Gravity was disabled', () => {
		expect(physics.engine.world.gravity.y).toBe(0)
	})
})
