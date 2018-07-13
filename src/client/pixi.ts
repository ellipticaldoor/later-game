import { Application } from '@pixi/app'
import { settings } from '@pixi/settings'
import { SCALE_MODES } from '@pixi/constants'
import { Renderer } from '@pixi/core'
import { SpriteRenderer } from '@pixi/sprite'
import { skipHello } from '@pixi/utils'

Renderer.registerPlugin('sprite', SpriteRenderer)

settings.SCALE_MODE = SCALE_MODES.NEAREST

skipHello()

const pixiConfig: PIXI.ApplicationOptions = {
	antialias: false,
	transparent: false,
	resolution: 1,
}

const pixi = new Application(pixiConfig)

document.body.appendChild(pixi.view)
pixi.renderer.view.id = 'game'

pixi.renderer.autoResize = true
const resize = () => pixi.renderer.resize(window.innerWidth, window.innerHeight)
window.addEventListener('resize', resize, false)
resize()

export default pixi
