import { textureOf, spriteOf, cropTexture } from 'client/helpers/sprite.helpers'

const tileSize = 64
const defaultImage: Asset = 'default'
const defaultImageSize: ISize = { width: tileSize * 3, height: tileSize }

test('textureOf creates a new pixi texture', () => {
	const texture = textureOf(defaultImage)
	const { cacheId } = texture.baseTexture as any
	expect(cacheId).toBe(defaultImage)
})

test('spriteOf creates a new pixi Sprite', () => {
	const sprite = spriteOf(defaultImage)
	expect(sprite).toHaveProperty('_texture')
})

test('cropTexture creates a new cropped texture from a tileset image', () => {
	const tilesetTexture = textureOf(defaultImage)
	tilesetTexture.baseTexture.width = defaultImageSize.width
	tilesetTexture.baseTexture.height = defaultImageSize.height

	// Crop first tile
	const viewport1 = { x: 0, y: 0 }
	const croppedTexture1 = cropTexture(tilesetTexture, viewport1)

	expect(croppedTexture1.orig.x).toBe(viewport1.x)
	expect(croppedTexture1.orig.y).toBe(viewport1.y)
	expect(croppedTexture1.orig.width).toBe(tileSize)
	expect(croppedTexture1.orig.height).toBe(tileSize)

	// Crop second tile
	const viewport2 = { x: tileSize, y: 0 }
	const croppedTexture2: PIXI.Texture = cropTexture(tilesetTexture, viewport2)

	expect(croppedTexture2.orig.x).toBe(viewport2.x)
	expect(croppedTexture2.orig.y).toBe(viewport2.y)
	expect(croppedTexture2.orig.width).toBe(tileSize)
	expect(croppedTexture2.orig.height).toBe(tileSize)
})
