import { World, Bodies, Body } from 'matter-js'
import { tileSize } from '@client/constants'
import { entityBodyParams, staticBodyParams } from './physics.constants'
import { physics } from './physics'

export const makeBody = (point: Point, bodyType: BodyType): Matter.Body => {
	const options: Matter.IBodyDefinition =
		bodyType === 'entity' ? entityBodyParams : staticBodyParams

	const body: Matter.Body = Bodies.rectangle(
		point.x,
		point.y,
		tileSize,
		tileSize,
		options
	)

	World.add(physics.engine.world, body)

	return body
}

export const moveEntity = (
	delta: number,
	body: Matter.Body,
	force: number,
	dir: Direction
): void => {
	Body.setVelocity(body, {
		x: body.velocity.x + dir.x * force * delta,
		y: body.velocity.y + dir.y * force * delta,
	})
}

export const updateEntityPosition = (
	sprite: PIXI.Sprite,
	body: Matter.Body
): void => {
	sprite.position.x = Math.floor(body.position.x)
	sprite.position.y = Math.floor(body.position.y)
}
