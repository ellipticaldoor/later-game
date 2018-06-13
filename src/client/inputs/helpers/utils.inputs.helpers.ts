import * as mousetrap from 'mousetrap'
import { map } from 'ramda'

export const bindInputEvents = (inputs: Inputs): void => {
	map(bindHoldEvent, Object.values(inputs))

	// Reset inputs state when the window gets out of focus
	window.onblur = () => map(input => (input.state = false), inputs)
}

export const bindHoldEvent = (input: Input): void => {
	mousetrap.bind(input.key, () => (input.state = true), 'keydown')
	mousetrap.bind(input.key, () => (input.state = false), 'keyup')
}
