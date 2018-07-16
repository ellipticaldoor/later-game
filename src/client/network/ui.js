export const updateParameters = (server, player1, player2) => {
	updatePlayerParameters(player1, 'player1', player1)
	updatePlayerParameters(player2, 'player2', player1)
	server.setUpdateRate(updateNumberFromUI(server.update_rate, 'server_fps'))
	return true
}

const updatePlayerParameters = (client, prefix, player1) => {
	client.lag = updateNumberFromUI(player1.lag, prefix + '_lag')

	const cbPrediction = document.getElementById(prefix + '_prediction')
	const cbReconciliation = document.getElementById(prefix + '_reconciliation')

	// Client Side Prediction disabled => disable Server Reconciliation.
	if (client.client_side_prediction && !cbPrediction.checked) {
		cbReconciliation.checked = false
	}

	// Server Reconciliation enabled => enable Client Side Prediction.
	if (!client.server_reconciliation && cbReconciliation.checked) {
		cbPrediction.checked = true
	}

	client.client_side_prediction = cbPrediction.checked
	client.server_reconciliation = cbReconciliation.checked

	client.entity_interpolation = document.getElementById(
		prefix + '_interpolation'
	).checked
}

const updateNumberFromUI = (oldValue, elementId) => {
	const input = document.getElementById(elementId)
	const newValue = parseInt(input.value)
	input.value = isNaN(newValue) ? oldValue : newValue
	return newValue
}

export const keyHandler = (player1, player2, e) => {
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
