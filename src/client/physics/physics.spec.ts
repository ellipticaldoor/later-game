import physicsSetup from './physics'
import { pixiMock } from '@client/constants/testing'

// @ts-ignore
const pixi: PIXI.Application = { ...pixiMock }

describe('Test physics setup', () => {
	const physics = physicsSetup(pixi)
	// expect(physics)

	test('', () => {})
})
