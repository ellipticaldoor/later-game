import pixi from '~/pixi'
import game from '~/game'
import resize from '~/helpers/resize.helper'
import assets from '~/assets'
import { Loader } from '@pixi/loaders'

if (module.hot) {
	module.hot.accept(() => {})
	module.hot.dispose(() => window.location.reload())
}

document.body.appendChild(pixi.view)
pixi.renderer.view.id = 'game'
resize(pixi)

Loader.shared
	.add(assets) // Load assets
	.load(() => game(pixi))
