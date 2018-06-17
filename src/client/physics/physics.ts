import { Engine, Render } from 'matter-js'
import { renderOptions } from 'client/physics/physics.constants'
const physicsEngine = Engine.create()
const element: any = document.getElementById('physics')

export const physics: IPhysics = {
	engine: physicsEngine,
	render: Render.create({
		engine: physicsEngine,
		element,
		options: renderOptions,
	}),
}

const gameLoop = (delta: number, engine: Matter.Engine): void => {
	Engine.update(engine, delta)
}

const setup = ({ ticker }: PIXI.Application): IPhysics => {
	physics.engine.world.gravity.y = 0

	Render.run(physics.render)

	ticker.add(delta => gameLoop(delta, physics.engine))

	return physics
}

export default setup
