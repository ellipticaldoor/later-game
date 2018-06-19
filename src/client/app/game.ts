import { physicsState, physicsGameLoop } from 'client/physics/physics'
import { cameraState } from 'client/camera/camera'

export default (pixi: PIXI.Application): void => {
	const physics = physicsState()
	const camera = cameraState()

	pixi.stage.addChild(camera.view)

	pixi.ticker.add(delta => {
		physicsGameLoop(delta, physics.engine)
	})
}

// export default (pixi: PIXI.Application): IGame => ({
// 	atlas: atlasSetup(),
// 	player: playerSetup(pixi),
// 	inputs: inputsSetup(pixi),
// })
