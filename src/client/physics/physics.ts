import { Engine, Render } from 'matter-js'
import { renderOptions } from 'client/physics/physics.constants'

export const physicsGameLoop = (delta: number, engine: Matter.Engine): void => {
	Engine.update(engine, delta)
}

export const physicsState = (): IPhysics => {
	const physicsEngine = Engine.create()
	const element: any = document.getElementById('physics')

	const physics: IPhysics = {
		engine: physicsEngine,
		render: Render.create({
			engine: physicsEngine,
			element,
			options: renderOptions,
		}),
	}

	physics.engine.world.gravity.y = 0

	return physics
}
