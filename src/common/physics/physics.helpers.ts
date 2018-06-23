import { World, Bodies, Body } from 'matter-js'
import { tileSize } from 'common/atlas/atlas.constants'
import {
	entityBodyParams,
	staticBodyParams,
	staticBodies,
} from 'common/physics/physics.constants'

export const makeBody = (
	engine: Matter.Engine,
	point: IPoint,
	label: BodyLabel
): Matter.Body => {
	const options = staticBodies.includes(label)
		? staticBodyParams
		: entityBodyParams

	const body: Matter.Body = Bodies.rectangle(
		point.x,
		point.y,
		tileSize,
		tileSize,
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

export const syncSpritePosition = (
	sprite: PIXI.Sprite,
	body: Matter.Body
): void => {
	sprite.position.x = Math.floor(body.position.x)
	sprite.position.y = Math.floor(body.position.y)
}
