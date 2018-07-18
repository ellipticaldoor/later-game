import { playerMoveInput } from 'client/input/input.states'
import { getInputDirection } from 'client/input/input.helpers'
import socket from 'client/socket'

export const inputGameLoop = (state: IInputState): void => {
	const playerDir = getInputDirection(state.playerMove)
	const playerHasMoved = playerDir.x || playerDir.y

	if (playerHasMoved) {
		socket.emit('playerMove', playerDir)
	}
}

export const inputState = (): IInputState => ({
	playerMove: { ...playerMoveInput },
})
