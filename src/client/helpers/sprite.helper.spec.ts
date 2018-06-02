import { textureOf, spriteOf, cropTexture } from './sprite.helper'

const tileSize = 64
const defaultImage: Image = '/default_image.png'
const defaultImageSize: Size = { width: tileSize * 3, height: tileSize }

test('textureOf creates a new pixi texture', () => {
    const texture: PIXI.Texture = textureOf(defaultImage)
    const { cacheId } = (texture.baseTexture as any)
    expect(cacheId).toBe(defaultImage)
})

test('spriteOf creates a new pixi Sprite', () => {
    const sprite: PIXI.Sprite = spriteOf(defaultImage)
    expect(sprite).toHaveProperty('_texture')
})

test('cropTexture creates a new cropped texture from a tileset image', () => {
    const tilesetTexture: PIXI.Texture = textureOf(defaultImage)
    tilesetTexture.baseTexture.width = defaultImageSize.width
    tilesetTexture.baseTexture.height = defaultImageSize.height

    // Crop first tile
    const viewport1: Point = { x: 0, y: 0 }
    const croppedTexture1: PIXI.Texture = cropTexture(tilesetTexture, viewport1)

    expect(croppedTexture1.orig.x).toBe(viewport1.x)
    expect(croppedTexture1.orig.y).toBe(viewport1.y)
    expect(croppedTexture1.orig.width).toBe(tileSize)
    expect(croppedTexture1.orig.height).toBe(tileSize)


    // Crop second tile
    const viewport2: Point = { x: tileSize, y: 0 }
    const croppedTexture2: PIXI.Texture = cropTexture(tilesetTexture, viewport2)

    expect(croppedTexture2.orig.x).toBe(viewport2.x)
    expect(croppedTexture2.orig.y).toBe(viewport2.y)
    expect(croppedTexture2.orig.width).toBe(tileSize)
    expect(croppedTexture2.orig.height).toBe(tileSize)
})

