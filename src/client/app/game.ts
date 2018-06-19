import { physicsGameLoop, physicsState } from 'client/physics/physics'

export default (pixi: PIXI.Application): void => {
	const physics = physicsState()

	pixi.ticker.add(delta => {
		physicsGameLoop(delta, physics.engine)
	})
}
