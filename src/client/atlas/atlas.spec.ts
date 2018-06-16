import atlasSetup, { atlas } from './atlas'
import { cropTexture } from '@client/helpers/sprite.helpers'
import { staticTiles, groundTileLayer } from './atlas.constants'
import { camera } from '@client/camera/camera'
import { filter } from 'ramda'

const mockCropTexture = ((cropTexture as any) = jest.fn())

describe('Atlas setup', () => {
	atlasSetup()

	test('The layers have been loaded', () => {
		expect(atlas.layers).toHaveProperty('groundTileLayer')
		expect(atlas.layers).toHaveProperty('topTileLayer')
	})

	test('The textures have been loaded', () => {
		expect(mockCropTexture).toHaveBeenCalledTimes(5)
		expect(atlas.textures).toHaveLength(5)
	})

	test('The static bodies of groundTileLayer have been loaded', () => {
		const totalStaticTiles: Tile[] = filter(
			tile => (staticTiles.includes(tile) ? true : false),
			groundTileLayer.tiles
		)

		expect(atlas.bodies.ground).toHaveLength(totalStaticTiles.length)
	})

	test('The sprites have been loaded into the camera', () => {})
})
