import { Engine } from 'matter-js'
import { makeBody, moveBody, syncSpritePosition } from './physics.helpers'

const engine: Matter.Engine = Engine.create()
const point: Point = { x: 0, y: 0 }
const defaultBody = makeBody(engine, point, 'entity')
const delta = 1
const force = 10

describe('Test moveCamera', () => {
	test('Make an entity body and check that was added to the engine', () => {
		const entityBody = makeBody(engine, point, 'entity')

		expect(entityBody.isStatic).toBe(false)
		expect(engine.world.bodies.includes(entityBody)).toBe(true)
	})

	test('Make an static body and check that was added to the engine', () => {
		const staticBody = makeBody(engine, point, 'static')

		expect(staticBody.isStatic).toBe(true)
		expect(engine.world.bodies.includes(staticBody)).toBe(true)
	})
})

describe('Increase body velocity to move it', () => {
	const body = { ...defaultBody }

	test('Accelerate body Up', () => {
		moveBody(delta, body, force, { x: 0, y: -1 })

		expect(body.velocity.x).toBe(0)
		expect(body.velocity.y).toBe(force * -1)
	})

	test('Accelerate body Down', () => {
		moveBody(delta, body, force, { x: 0, y: 1 })

		expect(body.velocity.x).toBe(0)
		expect(body.velocity.y).toBe(0)
	})

	test('Accelerate body Rigth', () => {
		moveBody(delta, body, force, { x: 1, y: 0 })

		expect(body.velocity.x).toBe(force)
		expect(body.velocity.y).toBe(0)
	})

	test('Accelerate body Left', () => {
		moveBody(delta, body, force, { x: -1, y: 0 })

		expect(body.velocity.x).toBe(0)
		expect(body.velocity.y).toBe(0)
	})
})
