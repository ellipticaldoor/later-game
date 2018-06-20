import { Engine, Render } from 'matter-js'
import { renderOptions } from 'client/physics/physics.constants'

export const physicsState = (): IPhysics => {
	const engine = Engine.create()
	engine.world.gravity.y = 0

	return { engine }
}

export const physicsGameLoop = (delta: number, engine: Matter.Engine): void => {
	Engine.update(engine, delta)
}

export const renderPhysicsView = (engine: Matter.Engine): void => {
	const element: any = document.getElementById('physics')
	const render = Render.create({
		engine,
		element,
		options: renderOptions,
	})

	Render.run(render)
}
