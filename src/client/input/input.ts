import { playerMoveInput } from 'client/input/input.states'
import { getInputDirection } from 'client/input/input.helpers'

export const inputGameLoop = (state: IInputState): void => {
	getInputDirection(state.playerMove)
}

export const inputState = (): IInputState => ({
	playerMove: { ...playerMoveInput },
})
