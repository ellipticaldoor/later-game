import inputsSetup, { gameLoop } from './inputs'
import inputs from './inputs.state'
import { player } from '@client/player/player'
import { pixiMock } from '@client/constants/testing'
import { map } from 'ramda'

const pixi = Object.assign({}, pixiMock)
const delta = 1

describe('Test inputs setup', () => {
	inputsSetup(pixi)

	test('Input events are bind', () => {
		// TODO
	})

	test('Gameloop was added', () => {
		expect(pixi.ticker.add).toHaveBeenCalledTimes(1)
	})
})

describe('Gameloop behabiour', () => {
	beforeEach(() => {
		map(input => (input.state = false), Object.values(inputs))
	})

	test('Player is framed by default', () => {
		expect(player.frame).toBe(true)
	})

	test('When camera moves the player should not be framed', () => {
		inputs.cameraUp.state = true

		gameLoop(delta, inputs, pixi.renderer)

		expect(player.frame).toBe(false)

		inputs.cameraUp.state = false

		gameLoop(delta, inputs, pixi.renderer)

		expect(player.frame).toBe(true)
	})
})
