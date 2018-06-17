import atlasSetup, { atlas } from 'client/atlas/atlas'
import { cropTexture } from 'client/helpers/sprite.helpers'
import {
	staticTiles,
	groundTileLayer,
	topTileLayer,
} from 'common/atlas/atlas.constants'
import { camera } from 'client/camera/camera'
import { getContainerByName } from 'client/camera/camera.helpers'
import { filter } from 'ramda'

const mockCropTexture = ((cropTexture as any) = jest.fn())

describe('Atlas setup', () => {
	atlasSetup()

	test('The layers have been loaded', () => {
		expect(atlas.layers).toHaveProperty('groundTileLayer')
		expect(atlas.layers).toHaveProperty('topTileLayer')
	})

	test('The static bodies of groundTileLayer have been loaded', () => {
		const totalStaticTiles: Tile[] = filter(
			tile => (staticTiles.includes(tile) ? true : false),
			groundTileLayer.tiles
		)

		expect(atlas.bodies.ground).toHaveLength(totalStaticTiles.length)
	})

	test('The textures have been loaded', () => {
		expect(mockCropTexture).toHaveBeenCalledTimes(5)
		expect(atlas.textures).toHaveLength(5)
	})

	describe('Sprites loading', () => {
		const nonEmptyGroundTiles: Tile[] = filter(
			tile => (tile ? true : false),
			groundTileLayer.tiles
		)
		const nonEmptyTopTiles: Tile[] = filter(
			tile => (tile ? true : false),
			topTileLayer.tiles
		)

		test('The sprites have been loaded', () => {
			expect(atlas.sprites.ground).toHaveLength(nonEmptyGroundTiles.length)
			expect(atlas.sprites.top).toHaveLength(nonEmptyTopTiles.length)
		})

		test('The sprites have been loaded into the camera', () => {
			const ground = getContainerByName('ground', camera.containers)
			const top = getContainerByName('top', camera.containers)

			expect(ground.container.children).toHaveLength(nonEmptyGroundTiles.length)
			expect(top.container.children).toHaveLength(nonEmptyTopTiles.length)
		})
	})
})
