import { rand } from './utils.helpers'
import { map, range } from 'ramda'

test('rand provides a number >= than min and <= than max', () => {
	map(() => {
		const randomNumber = rand(1, 50)

		expect(randomNumber).toBeGreaterThanOrEqual(1)
		expect(randomNumber).toBeLessThanOrEqual(50)
	}, range(1, 50))
})
