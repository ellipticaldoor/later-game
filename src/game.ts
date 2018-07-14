import * as mainloop from 'mainloop.js'
import { GROUND_TILES } from 'tiles/tiles.constants'
import { physicsState, physicsGameLoop } from 'physics/physics'
import { loadTileBodies } from 'tiles/helpers/tiles.helpers'

const physics = physicsState()
loadTileBodies(physics.engine, GROUND_TILES)

mainloop.setUpdate(delta => {
	physicsGameLoop(delta, physics.engine)
})

mainloop.setEnd(() => {
	// console.log('Physics engine updated')
})

mainloop.start()
