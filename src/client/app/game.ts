import physicsSetup from '@client/physics/physics'
import cameraSetup from '@client/camera/camera'
import atlasSetup from '@client/atlas/atlas'
import playerSetup from '@client/player/player'
import keysSetup from '@client/keys/keys'

interface Game {
	physics: Physics
	camera: Camera
	atlas: Atlas
	player: Player
	keys: Keys
}

export default (pixi: PIXI.Application): Game => ({
	physics: physicsSetup(pixi),
	camera: cameraSetup(pixi),
	atlas: atlasSetup(),
	player: playerSetup(pixi),
	keys: keysSetup(pixi),
})
