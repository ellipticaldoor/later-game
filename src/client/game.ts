import atlasSetup from './modules/atlas/atlas'
import playerSetup from './modules/player/player'
import physicsSetup from './modules/physics/physics'
import cameraSetup from './modules/camera/camera'
import keysSetup from './modules/keys/keys'

export default pixi => {
	physicsSetup(pixi)
	cameraSetup(pixi)
	atlasSetup()
	playerSetup(pixi)
	keysSetup(pixi)
}
