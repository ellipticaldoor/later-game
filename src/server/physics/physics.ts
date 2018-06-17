import { Engine } from 'matter-js'
import { groundTileLayer } from 'common/atlas/atlas.constants'
import { loadTileBodiesForLayer } from 'common/atlas/helpers/atlas.helpers'

const physicsEngine = Engine.create()

loadTileBodiesForLayer(groundTileLayer, physicsEngine)

setInterval(() => {
	Engine.update(physicsEngine, 1000 / 60)
}, 1000 / 60)
