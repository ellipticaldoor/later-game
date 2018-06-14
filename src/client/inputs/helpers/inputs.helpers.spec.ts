import { inputMoveCamera, inputMovePlayer } from './inputs.helpers'
import inputsDefault from '../inputs.state'
import { player as playerDefault } from '@client/player/player'
import { map } from 'ramda'

const inputs = Object.assign({}, inputsDefault)
const player = Object.assign({}, playerDefault)
player.speed = 10
const delta = 1

beforeEach(() => {
	map(input => (input.state = false), Object.values(inputs))
	player.body.velocity.x = 0
	player.body.velocity.y = 0
})

describe('Input event actions', () => {
	describe('Player inputs events', () => {
		test('Player is not accelerated if there is no movement event', () => {
			const playerMoved = inputMovePlayer(delta, player, inputs)

			expect(playerMoved).toBe(false)

			expect(player.body.velocity.x).toBe(0)
			expect(player.body.velocity.y).toBe(0)
		})

		test('Player is not accelerates if there is no movement event', () => {
			inputs.playerUp.state = true

			const playerMoved = inputMovePlayer(delta, player, inputs)

			expect(playerMoved).toBe(true)
		})

		test('Player accelerates up when playerUp is active', () => {
			inputs.playerUp.state = true

			inputMovePlayer(delta, player, inputs)

			expect(player.body.velocity.x).toBe(0)
			expect(player.body.velocity.y).toBe(-10)
		})

		test('Player accelerates left when playerLeft is active', () => {
			inputs.playerLeft.state = true

			inputMovePlayer(delta, player, inputs)

			expect(player.body.velocity.x).toBe(-10)
			expect(player.body.velocity.y).toBe(0)
		})

		test('Player accelerates down when playerDown is active', () => {
			inputs.playerDown.state = true

			inputMovePlayer(delta, player, inputs)

			expect(player.body.velocity.x).toBe(0)
			expect(player.body.velocity.y).toBe(10)
		})

		test('Player accelerates right when playerRight is active', () => {
			inputs.playerRight.state = true

			inputMovePlayer(delta, player, inputs)

			expect(player.body.velocity.x).toBe(10)
			expect(player.body.velocity.y).toBe(0)
		})
	})
})

// describe('IJKL keys when toggled move the camera', () => {
// 	let toggleIJKL: ToggleIJKL = { i: false, j: false, k: false, l: false }
// 	const camera = Object.assign({}, defaultCamera)
// 	camera.speed = 15

// 	beforeEach(() => {
// 		toggleIJKL = { i: false, j: false, k: false, l: false }
// 		camera.view.position.x = 0
// 		camera.view.position.y = 0
// 	})

// 	test('Camera move up when I is toggled', () => {
// 		toggleIJKL.i = true
// 		keyMoveCamera(delta, camera, toggleIJKL)

// 		expect(camera.view.position.x).toBe(0)
// 		expect(camera.view.position.y).toBe(15)
// 	})

// 	test('Camera move left when J is toggled', () => {
// 		toggleIJKL.j = true
// 		keyMoveCamera(delta, camera, toggleIJKL)

// 		expect(camera.view.position.x).toBe(15)
// 		expect(camera.view.position.y).toBe(0)
// 	})

// 	test('Camera move down when K is toggled', () => {
// 		toggleIJKL.k = true
// 		keyMoveCamera(delta, camera, toggleIJKL)

// 		expect(camera.view.position.x).toBe(0)
// 		expect(camera.view.position.y).toBe(-15)
// 	})

// 	test('Camera move right when L is toggled', () => {
// 		toggleIJKL.l = true
// 		keyMoveCamera(delta, camera, toggleIJKL)

// 		expect(camera.view.position.x).toBe(-15)
// 		expect(camera.view.position.y).toBe(0)
// 	})
// })
