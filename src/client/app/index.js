import pixi from './pixi'
import game from './game'
import resize from '@client/helpers/resize.helper'
import assets from '@client/assets'
import { Loader } from '@pixi/loaders'
import './colyseus'

if (module.hot) {
	module.accept(() => {})
	module.dispose(() => window.location.reload())
}

document.body.appendChild(pixi.view)
pixi.renderer.view.id = 'game'
resize(pixi)

Loader.shared
	.add(assets) // Load assets
	.load(() => game(pixi))
