import { Engine, World } from 'matter-js'
import { groundTileLayer } from 'common/atlas/atlas.constants'
import { loadTileBodiesForLayer } from 'common/atlas/helpers/atlas.helpers'
import { makeBody, moveBody } from 'common/physics/physics.helpers'
import { getTilePoint } from 'common/atlas/helpers/utils.atlas.helpers'
import { rand } from 'common/helpers/utils.helpers'
// import { map } from 'ramda'

import * as Koa from 'koa'
import { Server } from 'http'
import * as IO from 'socket.io'

import { reduce } from 'ramda'
import * as uniqid from 'uniqid'
import * as mainloop from 'mainloop.js'

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

const nus = 60 // Number of updates per second - 0, 10, 20, 30, 40, 50 or 60
const limit = 60 / nus
let counter = 1
let emit = true

mainloop.setBegin(() => {
	// TODO: Process input here
	emit = counter === limit
	counter = emit ? 1 : counter + 1
})

// let leftRight: any = -1
// setInterval(() => (leftRight = leftRight * -1), 2000)

mainloop.setUpdate(delta => {
	Engine.update(physicsEngine, delta)
	// map(
	// 	(body: any) => {
	// 		moveBody(delta, body, 0.06, { x: leftRight, y: 0 })
	// 	},
	// 	bodies as any
	// )
})

mainloop.setEnd(() => {
	if (emit) {
		io.emit('gameState', updateGamestate(bodies))
	}
})

mainloop.start()
