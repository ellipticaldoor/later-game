import atlasSetup from '@client/atlas/atlas'
import playerSetup from '@client/player/player'
import physicsSetup from '@client/physics/physics'
import cameraSetup from '@client/camera/camera'
import keysSetup from '@client/keys/keys'

export default (pixi: PIXI.Application) => {
	physicsSetup(pixi)
	cameraSetup(pixi)
	atlasSetup()
	playerSetup(pixi)
	keysSetup(pixi)
}
