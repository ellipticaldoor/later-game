import { Engine } from 'matter-js'

export const physicsState = (): IPhysics => {
	const engine = Engine.create()
	engine.world.gravity.y = 0

	return { engine }
}

export const physicsGameLoop = (delta: number, engine: Matter.Engine): void => {
	Engine.update(engine, delta)
}
