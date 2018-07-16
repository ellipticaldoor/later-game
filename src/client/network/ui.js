// Update simulation parameters from UI.
export const updateParameters = function(server, player1, player2) {
	updatePlayerParameters(player1, 'player1', player1)
	updatePlayerParameters(player2, 'player2', player1)
	server.setUpdateRate(updateNumberFromUI(server.update_rate, 'server_fps'))
	return true
}

const updatePlayerParameters = function(client, prefix, player1) {
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

const updateNumberFromUI = function(old_value, element_id) {
	var input = document.getElementById(element_id)
	var new_value = parseInt(input.value)
	if (isNaN(new_value)) {
		new_value = old_value
	}
	input.value = new_value
	return new_value
}

// When the player presses the arrow keys, set the corresponding flag in the client.
export const keyHandler = function(player1, player2, e) {
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
