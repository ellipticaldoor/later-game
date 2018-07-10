import * as mainloop from 'mainloop.js'
import { GROUND_TILES } from 'tiles/tiles.constants'
import { physicsState, physicsGameLoop } from 'physics/physics'
import { loadTileBodies } from 'tiles/helpers/tiles.helpers'

import { createServer } from 'http'
import * as IO from 'socket.io'

const server = createServer()
const io = IO(server)
const port = process.env.PORT || 4000

server.listen(port, () => console.log(`Listening socket.io on port ${port}`))

const connect = (socket: any) => {
	console.log('client connected')
	socket.emit('connected', {})
}

io.on('connect', connect)

const physics = physicsState()
loadTileBodies(GROUND_TILES, physics.engine)

mainloop.setUpdate((delta) => {
	physicsGameLoop(delta, physics.engine)
})

mainloop.setEnd(() => {
	// console.log('Physics engine updated')
})

mainloop.start()
