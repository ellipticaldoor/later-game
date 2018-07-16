import { Server } from './server'
import { Client } from './client'
import { keyHandler, updateParameters } from './ui'
import { curry } from 'ramda'

// Simulation
const server = new Server(
	document.getElementById('server_canvas'),
	document.getElementById('server_status')
)
const player1 = new Client(
	document.getElementById('player1_canvas'),
	document.getElementById('player1_status'),
	server
)
const player2 = new Client(
	document.getElementById('player2_canvas'),
	document.getElementById('player2_status'),
	server
)

server.connect(player1)
server.connect(player2)

// UI
document.body.onkeydown = curry(keyHandler)(player1, player2)
document.body.onkeyup = curry(keyHandler)(player1, player2)

updateParameters(server, player1, player2)

Array.from(document.getElementsByTagName('input')).map(element => {
	element.onchange = () => updateParameters(server, player1, player2)
})
