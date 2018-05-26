import { Client } from 'colyseus.js'
const host = window.document.location.host.replace(/:.*/, '')

const client = new Client(
	location.protocol.replace('http', 'ws') + host + ':' + 2222
)

const room = client.join('chat')

room.onJoin.add(function() {
	console.log('joined')
})

room.onStateChange.addOnce(function(state) {
	console.log('initial room state:', state)
})

// new room state
room.onStateChange.add(function(state) {
	// this signal is triggered on each patch
	console.log(state)
})
