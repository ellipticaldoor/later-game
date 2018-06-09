import { keyMovePlayer, keyMoveCamera } from './keys.helpers'
import { player as defaultPlayer } from '@client/player/player'
import { camera as defaultCamera } from '@client/camera/camera'

const delta = 1

describe('WASD keys when toggled accelerate the player', () => {
	let toggleWASD: ToggleWASD = { w: false, a: false, s: false, d: false }
	const player = Object.assign({}, defaultPlayer)
	player.force = 10

	beforeEach(() => {
		toggleWASD = { w: false, a: false, s: false, d: false }
		player.body.velocity.x = 0
		player.body.velocity.y = 0
	})

	test('Player accelerates up when W is toggled', () => {
		toggleWASD.w = true
		keyMovePlayer(delta, player, toggleWASD)

		expect(player.body.velocity.x).toBe(0)
		expect(player.body.velocity.y).toBe(-10)
	})

	test('Player accelerates left when A is toggled', () => {
		toggleWASD.a = true
		keyMovePlayer(delta, player, toggleWASD)

		expect(player.body.velocity.x).toBe(-10)
		expect(player.body.velocity.y).toBe(0)
	})

	test('Player accelerates down when S is toggled', () => {
		toggleWASD.s = true
		keyMovePlayer(delta, player, toggleWASD)

		expect(player.body.velocity.x).toBe(0)
		expect(player.body.velocity.y).toBe(10)
	})

	test('Player accelerates right when D is toggled', () => {
		toggleWASD.d = true
		keyMovePlayer(delta, player, toggleWASD)

		expect(player.body.velocity.x).toBe(10)
		expect(player.body.velocity.y).toBe(0)
	})
})

describe('IJKL keys when toggled move the camera', () => {
	let toggleIJKL: ToggleIJKL = { i: false, j: false, k: false, l: false }
	const camera = Object.assign({}, defaultCamera)
	camera.speed = 15

	beforeEach(() => {
		toggleIJKL = { i: false, j: false, k: false, l: false }
		camera.view.position.x = 0
		camera.view.position.y = 0
	})

	test('Camera move up when I is toggled', () => {
		toggleIJKL.i = true
		keyMoveCamera(delta, camera, toggleIJKL)

		expect(camera.view.position.x).toBe(0)
		expect(camera.view.position.y).toBe(15)
	})

	test('Camera move left when J is toggled', () => {
		toggleIJKL.j = true
		keyMoveCamera(delta, camera, toggleIJKL)

		expect(camera.view.position.x).toBe(15)
		expect(camera.view.position.y).toBe(0)
	})

	test('Camera move down when K is toggled', () => {
		toggleIJKL.k = true
		keyMoveCamera(delta, camera, toggleIJKL)

		expect(camera.view.position.x).toBe(0)
		expect(camera.view.position.y).toBe(-15)
	})

	test('Camera move right when L is toggled', () => {
		toggleIJKL.l = true
		keyMoveCamera(delta, camera, toggleIJKL)

		expect(camera.view.position.x).toBe(-15)
		expect(camera.view.position.y).toBe(0)
	})
})
