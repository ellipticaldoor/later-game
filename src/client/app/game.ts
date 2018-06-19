import { physicsState, physicsGameLoop } from 'client/physics/physics'
import { cameraState } from 'client/camera/camera'
import { atlasState, loadAtlasSprites } from 'client/atlas/atlas'
import {
	playerState,
	loadPlayerSprite,
	playerGameLoop,
} from 'client/player/player'

export default (pixi: PIXI.Application): void => {
	const physics = physicsState()

	const camera = cameraState()
	pixi.stage.addChild(camera.view)

	const atlas = atlasState(physics)
	loadAtlasSprites(atlas, camera)

	const player = playerState(physics)
	loadPlayerSprite(player, camera)

	pixi.ticker.add(delta => {
		physicsGameLoop(delta, physics.engine)
		playerGameLoop(player)
	})
}

// export default (pixi: PIXI.Application): IGame => ({
// 	inputs: inputsSetup(pixi),
// })
