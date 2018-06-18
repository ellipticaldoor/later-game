import { Engine } from 'matter-js'
import { groundTileLayer } from 'common/atlas/atlas.constants'
import { loadTileBodiesForLayer } from 'common/atlas/helpers/atlas.helpers'
import { makeBody } from 'common/physics/physics.helpers'
import { getTilePoint } from 'common/atlas/helpers/utils.atlas.helpers'

import * as Koa from 'koa'
import { Server } from 'http'
import * as IO from 'socket.io'

import { map } from 'ramda'

// Load physics
const physicsEngine = Engine.create()
physicsEngine.world.gravity.y = 0

loadTileBodiesForLayer(groundTileLayer, physicsEngine)

// Create entities
const bodies: any = []
bodies.push(makeBody(physicsEngine, getTilePoint({ col: 2, row: 3 }), 'entity'))
bodies.push(makeBody(physicsEngine, getTilePoint({ col: 3, row: 4 }), 'entity'))
bodies.push(makeBody(physicsEngine, getTilePoint({ col: 5, row: 6 }), 'entity'))
console.log(getTilePoint({ col: 2, row: 3 }), bodies[0].position)

// Game state
let gamestate: any = []

const updateGamestate = (entities: any) => {
	return map(
		entity => ({
			x: entity.position.x,
			y: entity.position.y,
		}),
		entities
	)
}

setInterval(() => {
	Engine.update(physicsEngine, 1000 / 60)
	gamestate = updateGamestate(bodies)
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

	console.log(gamestate)
	// socket.emit(JSON.stringify(physicsEngine.world.bodies))
	// TODO: Add entity body

	socket.on('disconnect', () => {
		console.log(`client disconnected`)
		// TODO: Destroy entity body
	})
})
