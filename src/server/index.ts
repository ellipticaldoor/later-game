import * as express from 'express'
import * as WebSocket from 'uws'
import { createServer } from 'http'
import { Server } from 'colyseus'
import { monitor } from '@colyseus/monitor'
import { ChatRoom } from './chat'

const port = Number(process.env.PORT || 2222)
const app = express()

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({
	engine: WebSocket.Server,
	server: createServer(app),
})

// Register ChatRoom as "chat"
gameServer.register('chat', ChatRoom)

// Register ChatRoom with initial options, as "chat_with_options"
// onInit(options) will receive client join options + options registered here.
gameServer.register('chat_with_options', ChatRoom, {
	custom_options: 'you can use me on Room#onInit',
})

// (optional) attach web monitoring panel
app.use('/colyseus', monitor(gameServer))

gameServer.listen(port)

console.log(`\n👂  Backend server Listening on http://localhost:${port}`)
