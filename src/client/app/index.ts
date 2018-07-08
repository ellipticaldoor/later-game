import pixi from './pixi'
import resize from 'client/helpers/resize.helpers'
import assets from 'client/assets'
import { Loader } from '@pixi/loaders'

document.body.appendChild(pixi.view)
pixi.renderer.view.id = 'game'
resize(pixi)

Loader.shared
	.add(assets) // Load assets
	.load(async () => {
		const [{ default: socket }, { default: game }] = await Promise.all([
			import('./socket.io'),
			import('./game'),
		])

		socket.on(
			'connected',
			(initialServerData: any): void => {
				console.log(initialServerData)
				game(pixi)
			}
		)
	})
