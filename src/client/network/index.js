import { Entity, applyInputToEntity } from './entity'
import { LagNetwork, sendMessage, receiveMessage } from './messages'
import { renderWorld } from './helpers'
import { Client } from './client'

// =============================================================================
//  The Server.
// =============================================================================
var Server = function(canvas, status) {
	// Connected clients and their entities.
	this.clients = []
	this.entities = []

	// Last processed input for each client.
	this.last_processed_input = []

	// Simulated network connection.
	this.network = LagNetwork()

	// UI.
	this.canvas = canvas
	this.status = status

	// Default update rate.
	this.setUpdateRate(10)
}

Server.prototype.connect = function(client) {
	// Give the Client enough data to identify itself.
	client.server = this
	client.entity_id = this.clients.length
	this.clients.push(client)

	// Create a new Entity for this Client.
	var entity = new Entity()
	this.entities.push(entity)
	entity.entity_id = client.entity_id

	// Set the initial state of the Entity (e.g. spawn point)
	var spawn_points = [4, 6]
	entity.x = spawn_points[client.entity_id]
}

Server.prototype.setUpdateRate = function(hz) {
	this.update_rate = hz

	clearInterval(this.update_interval)
	this.update_interval = setInterval(
		(function(self) {
			return function() {
				self.update()
			}
		})(this),
		1000 / this.update_rate
	)
}

Server.prototype.update = function() {
	this.processInputs()
	this.sendWorldState()
	renderWorld(this.canvas, this.entities)
}

// Check whether this input seems to be valid (e.g. "make sense" according
// to the physical rules of the World)
Server.prototype.validateInput = function(input) {
	if (Math.abs(input.press_time) > 1 / 40) {
		return false
	}
	return true
}

Server.prototype.processInputs = function() {
	// Process all pending messages from clients.
	while (true) {
		var message = receiveMessage(this.network.messages)
		if (!message) {
			break
		}

		// Update the state of the entity, based on its input.
		// We just ignore inputs that don't look valid; this is what prevents clients from cheating.
		if (this.validateInput(message)) {
			var id = message.entity_id
			applyInputToEntity(message, this.entities[id])
			this.last_processed_input[id] = message.input_sequence_number
		}
	}

	// Show some info.
	var info = 'Last acknowledged input: '
	for (let i = 0; i < this.clients.length; ++i) {
		info += 'Player ' + i + ': #' + (this.last_processed_input[i] || 0) + '   '
	}
	this.status.textContent = info
}

// Send the world state to all the connected clients.
Server.prototype.sendWorldState = function() {
	// Gather the state of the world. In a real app, state could be filtered to avoid leaking data
	// (e.g. position of invisible enemies).
	var world_state = []
	var num_clients = this.clients.length
	for (let i = 0; i < num_clients; i++) {
		var entity = this.entities[i]
		world_state.push({
			entity_id: entity.entity_id,
			position: entity.x,
			last_processed_input: this.last_processed_input[i],
		})
	}

	// Broadcast the state to all the clients.
	for (let i = 0; i < num_clients; i++) {
		var client = this.clients[i]
		sendMessage(client.lag, world_state, client.network.messages)
	}
}

// =============================================================================
//  Get everything up and running.
// =============================================================================

// Update simulation parameters from UI.
var updateParameters = function() {
	updatePlayerParameters(player1, 'player1')
	updatePlayerParameters(player2, 'player2')
	server.setUpdateRate(updateNumberFromUI(server.update_rate, 'server_fps'))
	return true
}

const inputs = Array.from(document.getElementsByTagName('input'))
inputs.map(element => {
	element.onchange = () => updateParameters()
})

var updatePlayerParameters = function(client, prefix) {
	client.lag = updateNumberFromUI(player1.lag, prefix + '_lag')

	var cb_prediction = document.getElementById(prefix + '_prediction')
	var cb_reconciliation = document.getElementById(prefix + '_reconciliation')

	// Client Side Prediction disabled => disable Server Reconciliation.
	if (client.client_side_prediction && !cb_prediction.checked) {
		cb_reconciliation.checked = false
	}

	// Server Reconciliation enabled => enable Client Side Prediction.
	if (!client.server_reconciliation && cb_reconciliation.checked) {
		cb_prediction.checked = true
	}

	client.client_side_prediction = cb_prediction.checked
	client.server_reconciliation = cb_reconciliation.checked

	client.entity_interpolation = document.getElementById(
		prefix + '_interpolation'
	).checked
}

var updateNumberFromUI = function(old_value, element_id) {
	var input = document.getElementById(element_id)
	var new_value = parseInt(input.value)
	if (isNaN(new_value)) {
		new_value = old_value
	}
	input.value = new_value
	return new_value
}

// When the player presses the arrow keys, set the corresponding flag in the client.
var keyHandler = function(e) {
	e = e || window.event
	if (e.keyCode == 39) {
		player1.key_right = e.type == 'keydown'
	} else if (e.keyCode == 37) {
		player1.key_left = e.type == 'keydown'
	} else if (e.key == 'd') {
		player2.key_right = e.type == 'keydown'
	} else if (e.key == 'a') {
		player2.key_left = e.type == 'keydown'
	}
}
document.body.onkeydown = keyHandler
document.body.onkeyup = keyHandler

// Setup a server, the player's client, and another player.
var server = new Server(
	document.getElementById('server_canvas'),
	document.getElementById('server_status')
)
var player1 = new Client(
	document.getElementById('player1_canvas'),
	document.getElementById('player1_status'),
	server
)
var player2 = new Client(
	document.getElementById('player2_canvas'),
	document.getElementById('player2_status'),
	server
)

// Connect the clients to the server.
server.connect(player1)
server.connect(player2)

// Read initial parameters from the UI.
updateParameters()
