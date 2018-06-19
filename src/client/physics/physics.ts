import { Engine, Render } from 'matter-js'
import { renderOptions } from 'client/physics/physics.constants'

export const physicsGameLoop = (delta: number, engine: Matter.Engine): void => {
	Engine.update(engine, delta)
}

export const physicsState = (): IPhysics => {
	const element: any = document.getElementById('physics')
	const engine = Engine.create()
	engine.world.gravity.y = 0

	return {
		engine,
		render: Render.create({
			engine,
			element,
			options: renderOptions,
		}),
	}
}
