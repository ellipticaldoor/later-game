import {
	loadAtlasTextures,
	makeTileSprite,
	loadSpritesForLayer,
	loadTileBodiesForLayer,
} from 'client/atlas/helpers/atlas.helpers'
import { staticTiles } from 'client/atlas/atlas.constants'
import { physics } from 'client/physics/physics'
import { cropTexture, textureOf } from 'client/helpers/sprite.helpers'
import { Sprite } from '@pixi/sprite'
import { filter, map } from 'ramda'

// prettier-ignore
const tileLayer: ITileLayer = {
	zIndex: 0,
	cols: 4,
	rows: 4,
	tiles: [
		0, 0, 0, 0,
		0, 1, 1, 1,
		0, 1, 2, 3,
		0, 1, 3, 3,
	],
}
const tilesetImage: Asset = 'default'
const image: Asset = 'default'
const textures = [textureOf(image), textureOf(image)]

test('Create texture tiles from an image that contains a tileset', () => {
	const mockCropTexture = ((cropTexture as any) = jest.fn())
	const atlasTextures = loadAtlasTextures(tilesetImage)

	expect(mockCropTexture).toHaveBeenCalledTimes(5)
	expect(atlasTextures).toHaveLength(5)
})

test('Make a new sprite based on a tile tipe and textures for it', () => {
	const tileLocation: ITileLocation = { col: 3, row: 1 }
	const groundType: Tile = 1

	const tileSprite = makeTileSprite(groundType, tileLocation, textures)

	expect(tileSprite).toBeInstanceOf(Sprite)
})

test('Make a new sprite for each non empty tile', () => {
	const sprites = loadSpritesForLayer(tileLayer, textures)

	const nonEmptyTiles = filter(tile => (tile ? true : false), tileLayer.tiles)

	expect(sprites).toHaveLength(nonEmptyTiles.length)
	map(sprite => {
		expect(sprite).toBeInstanceOf(Sprite)
	}, sprites)
})

test('Make a new matter-js body for each non empty tile', () => {
	const bodies = loadTileBodiesForLayer(tileLayer, physics.engine)

	const totalStaticTiles = filter(
		tile => (staticTiles.includes(tile) ? true : false),
		tileLayer.tiles
	)

	expect(bodies).toHaveLength(totalStaticTiles.length)
	map(body => {
		expect(body.type).toBe('body')
	}, bodies)
})
