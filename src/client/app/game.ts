import {
	physicsState,
	physicsGameLoop,
	renderPhysicsView,
} from 'client/physics/physics'
import { cameraState } from 'client/camera/camera'
import { atlasState, loadAtlasSprites } from 'client/atlas/atlas'
import {
	playerState,
	loadPlayerSprite,
	playerGameLoop,
} from 'client/player/player'
import { inputsState, inputsGameLoop } from 'client/inputs/inputs'
import { bindInputEvents } from 'client/inputs/helpers/utils.inputs.helpers'
import { entitiesState, entitiesGameLoop } from 'client/entities/entities'
import * as mainloop from 'mainloop.js'

export default (pixi: PIXI.Application): void => {
	const physics = physicsState()
	renderPhysicsView(physics.engine)

	const camera = cameraState()
	pixi.stage.addChild(camera.view)

	const atlas = atlasState(physics)
	loadAtlasSprites(atlas, camera)

	const player = playerState(physics)
	loadPlayerSprite(player, camera)

	const entities = entitiesState(physics, camera)

	const inputs = inputsState()
	bindInputEvents(inputs)
	// Disable right click
	document.addEventListener('contextmenu', event => {
		event.preventDefault()
	})

	mainloop.setUpdate(delta => {
		physicsGameLoop(delta, physics.engine)
		inputsGameLoop(delta, inputs, camera, player, pixi.renderer)
	})

	mainloop.setDraw(() => {
		playerGameLoop(player)
		entitiesGameLoop(entities)
	})

	mainloop.start()
}
