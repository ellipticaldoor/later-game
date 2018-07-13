import * as Socket from 'socket.io-client'

export const socket = Socket.connect('http://localhost:4000')

socket.on('connected', (state: any): void => {
	console.log(state)
})
