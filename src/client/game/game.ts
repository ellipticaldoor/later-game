import * as mainloop from 'mainloop.js'
import socket from 'client/socket'
import { curry } from 'ramda'
import { cameraState } from 'client/camera/camera'
import { getContainerByName } from 'client/camera/camera.helpers'
import { updateEntities } from 'client/game/game.helpers'
import { inputState, inputGameLoop } from 'client/input/input'
import { bindInputEvents } from 'client/input/input.helpers'

export default (pixi: PIXI.Application, connectionInfo: any): void => {
	const camera = cameraState()
	pixi.stage.addChild(camera.view)

	const entitiesCamera = getContainerByName('entities', camera.containers)
	const entitySprites: IDictionary<PIXI.Sprite> = {}
	socket.on('gameState', curry(updateEntities)(entitiesCamera, entitySprites))

	const input = inputState()
	bindInputEvents(input)

	mainloop.setUpdate(delta => {
		inputGameLoop(input)
	})

	mainloop.setDraw(() => {})

	mainloop.start()
}
