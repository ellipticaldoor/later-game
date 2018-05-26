import { World, Bodies, Body } from 'matter-js'
import { tileSize } from '@client/constants'
import { physics } from './physics'

export const makeBody = (x, y) => {
	const body = Bodies.rectangle(x, y, tileSize, tileSize, {
		inertia: Infinity,
		friction: 0,
		frictionAir: 0.1,
		restitution: 0,
	})

	World.add(physics.engine.world, body)

	return body
}

export const makeStaticBody = (x, y) => {
	const body = Bodies.rectangle(x, y, tileSize, tileSize, {
		isStatic: true,
		friction: 0,
		restitution: 0,
	})

	World.add(physics.engine.world, body)

	return body
}

export const moveEntity = (delta, body, force, dirX, dirY) =>
	Body.setVelocity(body, {
		x: body.velocity.x + dirX * force * delta,
		y: body.velocity.y + dirY * force * delta,
	})

export const updateEntityPosition = (sprite, body) => {
	sprite.position.x = Math.floor(body.position.x)
	sprite.position.y = Math.floor(body.position.y)
}

export const moveTo = (delta, player, force, dirX, dirY) => {
	Body.applyForce(player.body, player.body.position, {
		x: dirX * force * delta,
		y: dirY * force * delta,
	})
}
