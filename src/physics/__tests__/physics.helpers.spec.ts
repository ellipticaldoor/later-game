import { Engine } from 'matter-js'
import { makeBody, moveBody } from '../physics.helpers'

const engine = Engine.create()
const point: IPoint = { x: 5, y: 5 }
const delta = 1
const speed = 10

describe('Test moveCamera', () => {
	test('Make an entity body and check that was added to the engine', () => {
		const entityBody = makeBody(engine, point, 'player')

		expect(entityBody.isStatic).toBe(false)
		expect(engine.world.bodies.includes(entityBody)).toBe(true)
	})

	test('Make an static body and check that was added to the engine', () => {
		const staticBody = makeBody(engine, point, 'tile')

		expect(staticBody.isStatic).toBe(true)
		expect(engine.world.bodies.includes(staticBody)).toBe(true)
	})
})

describe('Increase body velocity to move it', () => {
	const body = makeBody(engine, point, 'player')

	test('Accelerate body Up', () => {
		moveBody(delta, body, speed, { x: 0, y: -1 })

		expect(body.velocity.x).toBe(0)
		expect(body.velocity.y).toBe(speed * -1)
	})

	test('Accelerate body Down', () => {
		moveBody(delta, body, speed, { x: 0, y: 1 })

		expect(body.velocity.x).toBe(0)
		expect(body.velocity.y).toBe(0)
	})

	test('Accelerate body Rigth', () => {
		moveBody(delta, body, speed, { x: 1, y: 0 })

		expect(body.velocity.x).toBe(speed)
		expect(body.velocity.y).toBe(0)
	})

	test('Accelerate body Left', () => {
		moveBody(delta, body, speed, { x: -1, y: 0 })

		expect(body.velocity.x).toBe(0)
		expect(body.velocity.y).toBe(0)
	})
})
