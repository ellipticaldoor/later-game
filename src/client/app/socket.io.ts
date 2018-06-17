import * as io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

socket.on('connect', () => {
	console.log('conected to http://localhost:4000')
})
