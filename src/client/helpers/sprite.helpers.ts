import { Texture } from '@pixi/core'
import { Sprite } from '@pixi/sprite'
import { TextureCache } from '@pixi/utils'
import { Rectangle } from '@pixi/math'
import { tileSize } from '@client/constants'

export const textureOf = (imagePath: Asset): PIXI.Texture => {
	let texture: PIXI.Texture = TextureCache[imagePath]

	if (!texture) {
		console.warn(`${imagePath} is not loaded from the texture cache.`)
		texture = Texture.fromImage(imagePath)
	}

	return texture
}

export const spriteOf = (imagePath: Asset): PIXI.Sprite =>
	new Sprite(textureOf(imagePath))

export interface CropTexture {
	(_texture: PIXI.Texture, viewport: Point): PIXI.Texture
}

export const cropTexture: CropTexture = (_texture, viewport) => {
	const texture = new Texture(_texture)

	texture.frame = new Rectangle(viewport.x, viewport.y, tileSize, tileSize)

	return texture
}
