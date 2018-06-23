import { Engine, World } from 'matter-js'
import { groundTileLayer } from 'common/atlas/atlas.constants'
import { loadTileBodiesForLayer } from 'common/atlas/helpers/atlas.helpers'
import { makeBody, moveBody } from 'common/physics/physics.helpers'
import { getTilePoint } from 'common/atlas/helpers/utils.atlas.helpers'
import { rand } from 'common/helpers/utils.helpers'
import { map } from 'ramda'

import * as Koa from 'koa'
import { Server } from 'http'
import * as IO from 'socket.io'

import { reduce } from 'ramda'
import * as uniqid from 'uniqid'

// Load physics
const physicsEngine = Engine.create()
physicsEngine.world.gravity.y = 0

loadTileBodiesForLayer(groundTileLayer, physicsEngine)

const updateGamestate = (entities: any) =>
	reduce(
		(acc, entityId) => {
			const entity = entities[entityId]

			acc[entityId] = {
				label: entity.label,
				x: Math.trunc(entity.position.x),
				y: Math.trunc(entity.position.y),
			}

			return acc
		},
		{} as any,
		Object.keys(entities)
	)

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
	const col = rand(7, 7) // TODO: Check if col / row are not reversed
	const row = rand(3, 3)

	const playerBody = makeBody(
		physicsEngine,
		getTilePoint({ col, row }),
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

// TODO: Use propper delta ticker
const delta = 1000 / 60
setInterval(() => {
	Engine.update(physicsEngine, delta)
	map(
		(body: any) => {
			moveBody(delta, body, 0.01, { x: -1, y: 0 })
		},
		bodies as any
	)
}, delta)

setInterval(() => {
	io.emit('gameState', updateGamestate(bodies))
}, 1000 / 20)
