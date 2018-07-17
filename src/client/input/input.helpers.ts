import * as mousetrap from 'mousetrap'
import { map } from 'ramda'

export const bindInputEvents = (inputState: IInputState): void => {
	map(map(bindHoldEvent), Object.values(inputState))

	// Reset inputs state when the window gets out of focus
	window.onblur = () =>
		map(
			map((input: IInput) => (input.state = false)),
			Object.values(inputState)
		)
}

export const bindHoldEvent = (input: IInput): void => {
	mousetrap.bind(input.key, () => (input.state = true), 'keydown')
	mousetrap.bind(input.key, () => (input.state = false), 'keyup')
}

export const getInputDirection = (input: IMoveInput): IDirection => ({
	x: input.left.state ? -1 : input.right.state ? 1 : 0,
	y: input.up.state ? -1 : input.down.state ? 1 : 0,
})
