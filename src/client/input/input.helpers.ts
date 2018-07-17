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

export const getInputDirection = (moveInput: IMoveInput): IDirection => ({
	x: moveInput.left.state ? -1 : moveInput.right.state ? 1 : 0,
	y: moveInput.up.state ? -1 : moveInput.down.state ? 1 : 0,
})
