import pixi from './pixi'
import game from './game'
import resize from '@client/helpers/resize.helpers'
import assets from '@client/assets'
import { Loader } from '@pixi/loaders'

if ((module as any).hot) {
	;(module as any)
		.accept(() => {})(module as any)
		.dispose(() => window.location.reload())
}

document.body.appendChild(pixi.view)
pixi.renderer.view.id = 'game'
resize(pixi)

Loader.shared
	.add(assets) // Load assets
	.load(() => game(pixi))
