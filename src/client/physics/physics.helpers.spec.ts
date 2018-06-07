import { Engine } from 'matter-js'
import { makeBody } from './physics.helpers'

const engine: Matter.Engine = Engine.create()

describe('Test moveCamera', () => {
	test('Make an entity body and check that was added to the engine', () => {
		const entityPoint: Point = { x: 10, y: 20 }
		const entityBody = makeBody(engine, entityPoint, 'entity')

		expect(entityBody.id)

		console.log(engine.world.bodies)
	})
})
