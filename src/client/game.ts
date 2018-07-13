import socket from 'client/socket'

export default (pixi: PIXI.Application, connectionInfo: any): void => {
	socket.on('gameState', (serverEntitiesState: any): void => {
		// console.log(serverEntitiesState)
	})

	console.log(connectionInfo)
	console.log(pixi)
}
