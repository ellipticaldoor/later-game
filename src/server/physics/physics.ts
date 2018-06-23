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

const updateGamestate = (entities: any) => {
	return map(entity => {
		return {
			x: entity.position.x,
			y: entity.position.y,
			label: entity.label,
		}
	}, entities)
}

// Load socket.io
// More examples https://github.com/mcpetersen/Evaluation-app
const app = new Koa()
const server = new Server(app.callback())
const io = IO(server)
const port = process.env.PORT || 4000

server.listen(port)
console.log(`Listening socket.io on port ${port}`)

// Create entities
const bodies: any = []

io.on('connect', socket => {
	console.log('client connected')

	const playerBody = makeBody(
		physicsEngine,
		getTilePoint({ col: 2, row: 3 }),
		'entity',
		'player'
	)
	bodies.push(playerBody)

	socket.on('disconnect', () => {
		console.log(`client disconnected`)
		// TODO: destroyBody()
	})
})

setInterval(() => {
	Engine.update(physicsEngine, 1000 / 60)
}, 1000 / 60)

setInterval(() => {
	io.emit('gamestate', updateGamestate(bodies))
}, 1000 / 24)
