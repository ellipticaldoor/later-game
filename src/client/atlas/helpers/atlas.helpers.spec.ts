import {
	loadAtlasTextures,
	makeTileSprite,
	loadSpritesForLayer,
	loadTileBodiesForLayer,
} from './atlas.helpers'
import { cropTexture, textureOf } from '@client/helpers/sprite.helpers'
import { Sprite } from '@pixi/sprite'

const tilesetImage = 'default'
const image = 'default'

test('Create texture tiles from an image that contains a tileset', () => {
	const mockCropTexture = ((cropTexture as any) = jest.fn())
	const textures = loadAtlasTextures(tilesetImage)

	expect(mockCropTexture).toHaveBeenCalledTimes(5)
	expect(textures).toHaveLength(5)
})

test('Make a new sprite based on a tile tipe and textures for it', () => {
	const tileLocation: TileLocation = { col: 3, row: 1 }
	const textures = [textureOf(image), textureOf(image)]
	const groundType: Tile = 1

	const tileSprite = makeTileSprite(textures, groundType, tileLocation)

	expect(tileSprite).toBeInstanceOf(Sprite)
})
