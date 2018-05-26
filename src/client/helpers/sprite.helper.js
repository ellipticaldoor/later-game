import { Texture } from '@pixi/core'
import { Sprite } from '@pixi/sprite'
import { TextureCache } from '@pixi/utils'
import { Rectangle } from '@pixi/math'
import { tileSize } from '@client/constants'

export const textureOf = imagePath => {
	let texture = TextureCache[imagePath]
	if (!texture) {
		console.warn(`${imagePath} is not loaded from the texture cache.`)
		texture = Texture.fromImage(imagePath)
	}

	return texture
}

export const spriteOf = imagePath => {
	return new Sprite(textureOf(imagePath))
}

export const cropTexture = (_texture, { tilesetSize, viewport }) => {
	const texture = new Texture(_texture)

	texture.baseTexture.setSize(tilesetSize[0], tilesetSize[1])
	texture.frame = new Rectangle(viewport[0], viewport[1], tileSize, tileSize)

	return texture
}

export const cropSpriteOf = (imagePath, cropParams) => {
	const croppedSprite = spriteOf(imagePath)
	cropTexture(croppedSprite['_texture'], cropParams)

	return (croppedSprite.cacheAsBitmap = true)
}
