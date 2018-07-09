import { World, Bodies, Body } from 'matter-js'
import { TILE_SIZE } from 'tiles/tiles.constants'
import {
	ENTITY_BODY_PARAMS,
	STATIC_BODIES_PARAMS,
	STATIC_BODIES,
} from 'physics/physics.constants'

export const makeBody = (
	engine: Matter.Engine,
	point: IPoint,
	label: BodyLabel
): Matter.Body => {
	const options = STATIC_BODIES.includes(label)
		? STATIC_BODIES_PARAMS
		: ENTITY_BODY_PARAMS

	const body: Matter.Body = Bodies.rectangle(
		point.x,
		point.y,
		TILE_SIZE,
		TILE_SIZE,
		options
	)

	body.label = label
	World.add(engine.world, body)

	return body
}

export const moveBody = (
	delta: number,
	body: Matter.Body,
	speed: number,
	dir: IDirection
): void => {
	Body.setVelocity(body, {
		x: body.velocity.x + dir.x * speed * delta,
		y: body.velocity.y + dir.y * speed * delta,
	})
}
