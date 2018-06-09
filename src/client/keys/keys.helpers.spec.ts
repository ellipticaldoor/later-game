import { keyMovePlayer } from './keys.helpers'
import { player as defaultPlayer } from '@client/player/player'

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

	test('Player accelerates down when A is toggled', () => {
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

	test('Player accelerates down when D is toggled', () => {
		toggleWASD.d = true
		keyMovePlayer(delta, player, toggleWASD)

		expect(player.body.velocity.x).toBe(10)
		expect(player.body.velocity.y).toBe(0)
	})
})
