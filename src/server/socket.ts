import { createServer } from 'http'
import * as Socket from 'socket.io'

export const server = createServer()
const socket = Socket(server)

const connect = (socket: any): void => {
	console.log('client connected')
	socket.emit('connected', { data: 'data' })
}

socket.on('connect', connect)
