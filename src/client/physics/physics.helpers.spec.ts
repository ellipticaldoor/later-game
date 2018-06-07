import { Engine } from 'matter-js'
import { makeBody } from './physics.helpers'

const engine: Matter.Engine = Engine.create()

describe('Test moveCamera', () => {
	test('Make an entity body and check that was added to the engine', () => {
		const entityPoint: Point = { x: 10, y: 20 }
		const entityBody = makeBody(engine, entityPoint, 'entity')

		expect(entityBody.isStatic).toBe(false)
		expect(engine.world.bodies.includes(entityBody)).toBe(true)
	})

	test('Make an static body and check that was added to the engine', () => {
		const staticPoint: Point = { x: 20, y: 40 }
		const staticBody = makeBody(engine, staticPoint, 'static')

		expect(staticBody.isStatic).toBe(true)
		expect(engine.world.bodies.includes(staticBody)).toBe(true)
	})
})
