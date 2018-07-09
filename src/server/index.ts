import { GROUND_TILES } from 'tiles/tiles.constants'
import { physicsState } from 'physics/physics'
import { loadBodiesFromTiles } from 'tiles/helpers/tiles.helpers'

const physics = physicsState()
loadBodiesFromTiles(GROUND_TILES, physics.engine)
