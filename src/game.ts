import atlasSetup from '~/components/atlas/atlas'
import playerSetup from '~/components/player/player'
import physicsSetup from '~/components/physics/physics'
import cameraSetup from '~/components/camera/camera'
import keysSetup from '~/components/keys/keys'

export default pixi => {
	physicsSetup(pixi)
	cameraSetup(pixi)
	atlasSetup()
	playerSetup(pixi)
	keysSetup(pixi)
}
