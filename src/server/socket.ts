import { createServer } from 'http'
import * as Socket from 'socket.io'

export const server = createServer()
export const socket = Socket(server)
