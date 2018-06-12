import { Engine } from 'matter-js'
import { Sprite } from '@pixi/sprite'
import { makeBody, moveBody, syncSpritePosition } from './physics.helpers'

const engine: Matter.Engine = Engine.create()
const point: Point = { x: 5, y: 5 }
const defaultBody = makeBody(engine, point, 'entity')
const delta = 1
const speed = 10

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
	const body = Object.assign({}, defaultBody)

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

test('Sync Sprite position with a body', () => {
	const sprite = new Sprite()
	const body = Object.assign({}, defaultBody)

	expect(sprite.position.x).toBe(0)
	expect(sprite.position.y).toBe(0)

	syncSpritePosition(sprite, body)

	expect(sprite.position.x).toBe(5)
	expect(sprite.position.y).toBe(5)
})
