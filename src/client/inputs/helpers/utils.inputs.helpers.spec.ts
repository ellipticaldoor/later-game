import { bindInputEvents, bindHoldEvent } from './utils.inputs.helpers'
import * as mousetrap from 'mousetrap'

describe('Ensure input bindings events are set', () => {
	let mockBind = ((mousetrap.bind as any) = jest.fn())
	let inputs: Inputs

	beforeEach(() => {
		mockBind.mockClear()

		inputs = {
			playerUp: { key: 'w', state: false },
			playerDown: { key: 's', state: false },
		}
	})

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

	test('All input events are binded', () => {
		bindInputEvents(inputs)

		expect(mousetrap.bind).toHaveBeenCalledTimes(Object.keys(inputs).length * 2)
	})

	test('When the browser loses focus all the event states are cleared', () => {
		bindInputEvents(inputs)

		inputs.playerUp.state = true

		// @ts-ignore
		window.onblur()

		expect(inputs.playerUp.state).toBe(false)
	})
})
