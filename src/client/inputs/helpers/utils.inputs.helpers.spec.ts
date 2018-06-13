import inputsDefault from '../inputs.state'
import { bindInputEvents, bindHoldEvent } from './utils.inputs.helpers'
import * as mousetrap from 'mousetrap'

describe('Ensure mousetrap keybindings are set', () => {
	const mockBind = ((mousetrap.bind as any) = jest.fn())
	const inputs = Object.assign({}, inputsDefault)

	test('An event gets toggled when pressed and untoggled when released', () => {
		bindHoldEvent(inputs.playerUp)

		expect(mousetrap.bind).toHaveBeenCalledTimes(2)

		expect(inputs.playerUp.state).toBe(false)

		const onKeydown = mockBind.mock.calls[0]
		expect(onKeydown[0]).toBe(inputs.playerUp.key)
		expect(onKeydown[2]).toBe('keydown')

		onKeydown[1]() // Simulate W keydown
		expect(inputs.playerUp.state).toBe(true)

		const onKeyup = mockBind.mock.calls[1]
		expect(onKeyup[0]).toBe(inputs.playerUp.key)
		expect(onKeyup[2]).toBe('keyup')
		onKeyup[1]() // Simulate W keyup
		expect(inputs.playerUp.state).toBe(false)
	})
})
