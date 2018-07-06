import * as io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

socket.on(
	'connect',
	(): void => {
		console.log('conected to http://localhost:4000')
	}
)

socket.on(
	'connected',
	(data: any): void => {
		console.log(data)
		// TODO: Load game
	}
)

export default socket
