import { rand } from './utils.helpers'
import { map, range } from 'ramda'

test('rand provides a number >= than min and <= than max', () => {
	const min = 1
	const max = 50

	map(() => {
		const randomNumber = rand(min, max)

		expect(randomNumber).toBeGreaterThanOrEqual(min)
		expect(randomNumber).toBeLessThanOrEqual(max)
	}, range(min, max))
})
