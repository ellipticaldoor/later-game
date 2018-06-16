import physicsSetup from '@client/physics/physics'
import cameraSetup from '@client/camera/camera'
import atlasSetup from '@client/atlas/atlas'
import playerSetup from '@client/player/player'
import inputsSetup from '@client/inputs/inputs'

interface IGame {
	physics: Physics
	camera: Camera
	atlas: Atlas
	player: Player
	inputs: Inputs
}

export default (pixi: PIXI.Application): IGame => ({
	physics: physicsSetup(pixi),
	camera: cameraSetup(pixi),
	atlas: atlasSetup(),
	player: playerSetup(pixi),
	inputs: inputsSetup(pixi),
})
