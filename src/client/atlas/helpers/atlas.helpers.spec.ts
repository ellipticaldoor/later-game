import {
	loadAtlasTextures,
	makeTileSprite,
	loadSpritesForLayer,
	loadTileBodiesForLayer,
} from './atlas.helpers'
import { cropTexture, textureOf } from '@client/helpers/sprite.helpers'
import { Sprite } from '@pixi/sprite'
import { filter, map } from 'ramda'

// prettier-ignore
const tileLayer: TileLayer = {
    zIndex: 0,
    cols: 4,
    rows: 4,
    data: [ // Rename data to tiles
        0, 0, 0, 0,
        0, 1, 1, 1,
        0, 1, 2, 2,
        0, 1, 2, 3,
    ],
}
const tilesetImage = 'default'
const image = 'default'
const textures = [textureOf(image), textureOf(image)]

test('Create texture tiles from an image that contains a tileset', () => {
	const mockCropTexture = ((cropTexture as any) = jest.fn())
	const textures = loadAtlasTextures(tilesetImage)

	expect(mockCropTexture).toHaveBeenCalledTimes(5)
	expect(textures).toHaveLength(5)
})

test('Make a new sprite based on a tile tipe and textures for it', () => {
	const tileLocation: TileLocation = { col: 3, row: 1 }
	const groundType: Tile = 1

	const tileSprite = makeTileSprite(groundType, tileLocation, textures)

	expect(tileSprite).toBeInstanceOf(Sprite)
})

test('Make a new sprite for each non empty tile', () => {
	const sprites = loadSpritesForLayer(tileLayer, textures)

	const nonEmptyTiles: Tile[] = filter(
		tile => (tile ? true : false),
		tileLayer.data
	)

	expect(sprites).toHaveLength(nonEmptyTiles.length)
	map(sprite => {
		expect(sprite).toBeInstanceOf(Sprite)
	}, sprites)
})
