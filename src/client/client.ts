import { Loader } from '@pixi/loaders'
import assets from 'client/assets'
import pixi from './pixi'

Loader.shared.add(assets).load(async () => {
	const [{ default: socket }, { default: game }] = await Promise.all([
		import('client/socket'),
		import('client/game'),
	])

	socket.on('connected', (playerStateMeta: any): void => {
		game(pixi, playerStateMeta)
	})
})
