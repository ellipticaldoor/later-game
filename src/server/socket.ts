import { createServer } from 'http'
import * as IO from 'socket.io'

export const server = createServer()
const io = IO(server)

const connect = (socket: any): void => {
	console.log('client connected')
	socket.emit('connected', {})
}

io.on('connect', connect)
