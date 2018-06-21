import { inputsState, inputsGameLoop } from 'client/inputs/inputs'
import { physicsState } from 'client/physics/physics'
import { playerState } from 'client/player/player'
import { cameraState } from 'client/camera/camera'
import { pixiMock } from 'client/constants/testing'
import { map } from 'ramda'

const pixi = Object.assign({}, pixiMock)
const inputs = inputsState()
const player = playerState(physicsState())
const camera = cameraState()
const delta = 1

describe('Gameloop behabiour', () => {
	beforeEach(() => {
		map(input => (input.state = false), Object.values(inputs))
	})

	test('When camera moves the player should not be framed', () => {
		inputs.cameraUp.state = true

		inputsGameLoop(delta, inputs, camera, player, pixi.renderer)

		expect(player.frame).toBe(false)

		inputs.cameraUp.state = false

		inputsGameLoop(delta, inputs, camera, player, pixi.renderer)

		expect(player.frame).toBe(true)
	})
})
