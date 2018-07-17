import { playerMoveInput } from 'client/input/input.states'
import { getInputDirection } from 'client/input/input.helpers'

export const inputGameLoop = (inputState: IInputState): void => {
	getInputDirection(inputState.playerMove)
}

export const inputState = (): IInputState => ({
	playerMove: { ...playerMoveInput },
})
