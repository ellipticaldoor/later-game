import * as mainloop from 'mainloop.js'
import * as uniqid from 'uniqid'
import { World } from 'matter-js'
import { rand } from 'helpers/utils.helpers'
import { socket } from 'server/socket'
import { physicsState, physicsGameLoop } from 'physics/physics'
import { GROUND_TILES } from 'tiles/tiles.constants'
import { loadTileBodies } from 'tiles/tiles.helpers'
import { getTilePoint } from 'tiles/tiles.utils'
import { makeBody, moveBody } from 'physics/physics.helpers'
import { updateGamestate } from 'state/state.helpers'

const physics = physicsState()

// loadTileBodies(physics.engine, GROUND_TILES)
const entityBodies: IDictionary<Matter.Body> = {}

let gameDelta = 0

mainloop.setUpdate(
	(delta): void => {
		gameDelta = delta
		physicsGameLoop(delta, physics.engine)
	}
)

mainloop.setEnd(
	(): void => {
		socket.emit('gameState', updateGamestate(entityBodies))
	}
)

mainloop.start()

socket.on(
	'connect',
	(clientSocket): void => {
		const entityBody = makeBody(
			physics.engine,
			getTilePoint({ col: rand(3, 7), row: rand(1, 3) }),
			'player'
		)

		const clientId = uniqid()

		entityBodies[clientId] = entityBody

		clientSocket.emit('connected', { clientId })

		clientSocket.on('disconnect', () => {
			World.remove(physics.engine.world, entityBody)
			delete entityBodies[clientId]
		})

		clientSocket.on('playerMove', dir => {
			moveBody(gameDelta, entityBody, 0.06, dir)
		})
	}
)
