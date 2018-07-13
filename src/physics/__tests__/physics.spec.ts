import { physicsState, physicsGameLoop } from 'physics/physics'

describe('Physics setup', () => {
	const physics = physicsState()

	test('Create a new physics state', () => {
		expect(physics)
	})

	test('Gravity was disabled', () => {
		expect(physics.engine.world.gravity.y).toBe(0)
	})

	test('Physics game loop', () => {
		const delta = 1
		physicsGameLoop(delta, physics.engine)

		// TODO: Check physics engine gets updated
	})
})
