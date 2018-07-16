//  A message queue with simulated network lag
export const LagNetwork = () => ({
	messages: [],
})

// Store each message with the timestamp when it should be received, to simulate lag
export const sendMessage = (lagMs, message, messages) => {
	messages.push({
		recv_ts: +new Date() + lagMs,
		payload: message,
	})
}

// Returns a "received" message, or undefined if there are no messages available yet
export const receiveMessage = messages => {
	const now = +new Date()

	for (let i = 0; i < messages.length; i++) {
		var message = messages[i]
		if (message.recv_ts <= now) {
			messages.splice(i, 1)
			return message.payload
		}
	}
}
