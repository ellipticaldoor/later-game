import * as mainloop from 'mainloop.js'
import { GROUND_TILES } from 'tiles/tiles.constants'
import { physicsState, physicsGameLoop } from 'physics/physics'
import { loadTileBodies } from 'tiles/helpers/tiles.helpers'

const physics = physicsState()
loadTileBodies(GROUND_TILES, physics.engine)

mainloop.setUpdate((delta): void => {
	physicsGameLoop(delta, physics.engine)
})

mainloop.setEnd((): void => {
	// console.log('Physics engine updated')
})

mainloop.start()
