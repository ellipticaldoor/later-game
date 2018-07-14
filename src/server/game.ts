import * as mainloop from 'mainloop.js'
import * as uniqid from 'uniqid'
import { World } from 'matter-js'
import { rand } from 'helpers/utils.helpers'
import { socket } from 'server/socket'
import { GROUND_TILES } from 'tiles/tiles.constants'
import { physicsState, physicsGameLoop } from 'physics/physics'
import { loadTileBodies } from 'tiles/helpers/tiles.helpers'
import { makeBody } from 'physics/physics.helpers'
import { getTilePoint } from 'tiles/helpers/utils.tiles.helpers'
import { updateGamestate } from 'state/state.helpers'

const physics = physicsState()

loadTileBodies(physics.engine, GROUND_TILES)
const entityBodies: IDictionary<Matter.Body> = {}

socket.on(
	'connect',
	(clientSocket): void => {
		const entityBody = makeBody(
			physics.engine,
			getTilePoint({
				col: rand(3, 7),
				row: rand(1, 3),
			}),
			'player'
		)

		const clientId = uniqid()

		entityBodies[clientId] = entityBody

		clientSocket.emit('connected', {
			clientId,
		})

		clientSocket.on('disconnect', () => {
			World.remove(physics.engine.world, entityBody)
			delete entityBodies[clientId]
		})
	}
)

mainloop.setUpdate(
	(delta): void => {
		physicsGameLoop(delta, physics.engine)
	}
)

mainloop.setEnd(
	(): void => {
		socket.emit('gameState', updateGamestate(entityBodies))
	}
)

mainloop.start()
