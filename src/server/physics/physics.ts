import { Engine, World } from 'matter-js'
import { groundTileLayer } from 'common/atlas/atlas.constants'
import { loadTileBodiesForLayer } from 'common/atlas/helpers/atlas.helpers'
import { makeBody } from 'common/physics/physics.helpers'
import { getTilePoint } from 'common/atlas/helpers/utils.atlas.helpers'

import * as Koa from 'koa'
import { Server } from 'http'
import * as IO from 'socket.io'

import { reduce } from 'ramda'
import * as uniqid from 'uniqid'

// Load physics
const physicsEngine = Engine.create()
physicsEngine.world.gravity.y = 0

loadTileBodiesForLayer(groundTileLayer, physicsEngine)

const updateGamestate = (entities: any) => {
	return reduce(
		(acc, entityId) => {
			const entity = entities[entityId]

			acc[entityId] = {
				x: entity.position.x,
				y: entity.position.y,
				label: entity.label,
			}

			return acc
		},
		{} as any,
		Object.keys(entities)
	)
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
// This bodies array is used to store only bodies that need to be updated
const bodies: any = {}

io.on('connect', socket => {
	console.log('client connected')

	const playerBody = makeBody(
		physicsEngine,
		getTilePoint({ col: 2, row: 3 }),
		'entity',
		'player'
	)
	const playerId = uniqid()
	bodies[playerId] = playerBody

	socket.on('disconnect', () => {
		console.log(`client disconnected`)

		World.remove(physicsEngine.world, playerBody)
		delete bodies[playerId]
	})
})

setInterval(() => {
	Engine.update(physicsEngine, 1000 / 60)
}, 1000 / 60)

setInterval(() => {
	io.emit('gamestate', updateGamestate(bodies))
}, 1000 / 24)
