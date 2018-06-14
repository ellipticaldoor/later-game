import { inputMovePlayer, inputMoveCamera } from './inputs.helpers'
import inputsDefault from '../inputs.state'
import { player as playerDefault } from '@client/player/player'
import { camera as cameraDefault } from '@client/camera/camera'
import { map } from 'ramda'

const inputs = Object.assign({}, inputsDefault)
const delta = 1

beforeEach(() => {
	map(input => (input.state = false), Object.values(inputs))
})

describe('Input event actions', () => {
	describe('Player inputs events', () => {
		const player = Object.assign({}, playerDefault)
		player.speed = 10

		beforeEach(() => {
			player.body.velocity.x = 0
			player.body.velocity.y = 0
		})

		test('Player is not accelerated if there is no movement event', () => {
			const playerMoved = inputMovePlayer(delta, player, inputs)

			expect(playerMoved).toBe(false)

			expect(player.body.velocity.x).toBe(0)
			expect(player.body.velocity.y).toBe(0)
		})

		test('Player is not accelerated if there is no movement event', () => {
			inputs.playerUp.state = true

			const playerMoved = inputMovePlayer(delta, player, inputs)

			expect(playerMoved).toBe(true)
		})

		test('Player is accelerated up when playerUp is active', () => {
			inputs.playerUp.state = true

			inputMovePlayer(delta, player, inputs)

			expect(player.body.velocity.x).toBe(0)
			expect(player.body.velocity.y).toBe(-10)
		})

		test('Player is accelerated left when playerLeft is active', () => {
			inputs.playerLeft.state = true

			inputMovePlayer(delta, player, inputs)

			expect(player.body.velocity.x).toBe(-10)
			expect(player.body.velocity.y).toBe(0)
		})

		test('Player is accelerated down when playerDown is active', () => {
			inputs.playerDown.state = true

			inputMovePlayer(delta, player, inputs)

			expect(player.body.velocity.x).toBe(0)
			expect(player.body.velocity.y).toBe(10)
		})

		test('Player is accelerated right when playerRight is active', () => {
			inputs.playerRight.state = true

			inputMovePlayer(delta, player, inputs)

			expect(player.body.velocity.x).toBe(10)
			expect(player.body.velocity.y).toBe(0)
		})
	})

	describe('Camera inputs events', () => {
		const camera = Object.assign({}, cameraDefault)
		camera.speed = 15

		beforeEach(() => {
			camera.view.position.x = 0
			camera.view.position.y = 0
		})

		test('Camera does not get moved if there is no active camera movement event', () => {
			const cameraMoved = inputMoveCamera(delta, camera, inputs)

			expect(cameraMoved).toBe(false)

			expect(camera.view.position.x).toBe(0)
			expect(camera.view.position.y).toBe(0)
		})

		test('Camera moves if there is a movement event', () => {
			inputs.cameraUp.state = true

			const cameraMoved = inputMoveCamera(delta, camera, inputs)

			expect(cameraMoved).toBe(true)
		})

		test('Camera is moves up when camerayerUp is active', () => {
			inputs.cameraUp.state = true

			inputMoveCamera(delta, camera, inputs)

			expect(camera.view.position.x).toBe(0)
			expect(camera.view.position.y).toBe(15)
		})

		test('Camera is moves left when camerarLeft is active', () => {
			inputs.cameraLeft.state = true

			inputMoveCamera(delta, camera, inputs)

			expect(camera.view.position.x).toBe(15)
			expect(camera.view.position.y).toBe(0)
		})

		test('Camera is moves down when camerarDown is active', () => {
			inputs.cameraDown.state = true

			inputMoveCamera(delta, camera, inputs)

			expect(camera.view.position.x).toBe(0)
			expect(camera.view.position.y).toBe(-15)
		})

		test('Camera is moves right when cameraRight is active', () => {
			inputs.cameraRight.state = true

			inputMoveCamera(delta, camera, inputs)

			expect(camera.view.position.x).toBe(-15)
			expect(camera.view.position.y).toBe(0)
		})
	})
})
