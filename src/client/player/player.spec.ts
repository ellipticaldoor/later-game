import playerSetup from './player'
import { pixiMock } from '@client/constants/testing'

const pixi = Object.assign({}, pixiMock)

describe('Test player setup', () => {
	const player = playerSetup(pixi)
	expect(player)

	test('A gameloop was added to the ticker', () => {
		expect(pixi.ticker.add).toHaveBeenCalledTimes(1)
	})
})
