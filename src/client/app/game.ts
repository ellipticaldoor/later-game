import { physicsState, physicsGameLoop } from 'client/physics/physics'
import { cameraState } from 'client/camera/camera'
import { atlasState, loadAtlasSprites } from 'client/atlas/atlas'

export default (pixi: PIXI.Application): void => {
	const physics = physicsState()
	const camera = cameraState()
	const atlas = atlasState(physics)

	loadAtlasSprites(atlas, camera)

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
