import { Engine, Render } from 'matter-js'
import { renderOptions } from '@client/physics/physics.constants'
const engine = Engine.create()

export const physics = {
	engine,
	render: Render.create({
		engine,
		element: document.getElementById('physics'),
		options: renderOptions,
	}),
}

const gameLoop = (delta, engine) => {
	Engine.update(engine, delta)
}

const setup = ({ ticker }) => {
	physics.engine.world.gravity.y = 0

	Render.run(physics.render)

	ticker.add(delta => gameLoop(delta, physics.engine))

	return physics
}

export default setup
