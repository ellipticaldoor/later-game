import { Engine } from 'matter-js'
import { groundTileLayer } from 'common/atlas/atlas.constants'
import { loadTileBodiesForLayer } from 'common/atlas/helpers/atlas.helpers'

import * as Koa from 'koa'
import { Server } from 'http'
import * as IO from 'socket.io'

// Load physics
const physicsEngine = Engine.create()

loadTileBodiesForLayer(groundTileLayer, physicsEngine)

setInterval(() => {
	Engine.update(physicsEngine, 1000 / 60)
}, 1000 / 60)

// Load socket.io
// More examples https://github.com/mcpetersen/Evaluation-app
const app = new Koa()
const server = new Server(app.callback())
const io = IO(server)
const port = process.env.PORT || 4000

server.listen(port)
console.log(`Listening socket.io on port ${port}`)

io.on('connect', socket => {
	console.log('client connected')

	socket.on('disconnect', () => {
		console.log(`client disconnected`)
	})
})
