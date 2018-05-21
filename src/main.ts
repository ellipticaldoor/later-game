import pixi from '~/pixi'
import game from '~/game'
import resize from '~/helpers/resize.helpers'
import assets from '~/assets'
import { Loader } from '@pixi/loaders'
import { rand } from '~/helpers/utils.helpers'

console.log(rand('ñ', 'j'))
console.log(process.env.NODE_ENV)

if ((module as any).hot) {
	(module as any).accept(() => {})
	(module as any).dispose(() => window.location.reload())
}

document.body.appendChild(pixi.view)
pixi.renderer.view.id = 'game'
resize(pixi)

Loader.shared
	.add(assets) // Load assets
	.load(() => game(pixi))
