import { Application } from '@pixi/app'
import { settings } from '@pixi/settings'
import { SCALE_MODES } from '@pixi/constants'
import { Renderer } from '@pixi/core'
import { SpriteRenderer } from '@pixi/sprite'
import { skipHello } from '@pixi/utils'

Renderer.registerPlugin('sprite', SpriteRenderer)

settings.SCALE_MODE = SCALE_MODES.NEAREST

skipHello()

const pixiConfig = {
	antialias: false,
	transparent: false,
	resolution: 1,
}

const pixi = new Application(pixiConfig)

export default pixi
