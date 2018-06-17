import { World, Bodies, Body } from 'matter-js'
import { tileSize } from 'client/constants'
import {
	entityBodyParams,
	staticBodyParams,
} from 'common/physics/physics.constants'

export const makeBody = (
	engine: Matter.Engine,
	point: IPoint,
	bodyType: BodyType
): Matter.Body => {
	const options: Matter.IBodyDefinition =
		bodyType === 'entity' ? entityBodyParams : staticBodyParams

	const body: Matter.Body = Bodies.rectangle(
		point.x,
		point.y,
		tileSize,
		tileSize,
		options
	)

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

export const syncSpritePosition = (
	sprite: PIXI.Sprite,
	body: Matter.Body
): void => {
	sprite.position.x = Math.floor(body.position.x)
	sprite.position.y = Math.floor(body.position.y)
}
