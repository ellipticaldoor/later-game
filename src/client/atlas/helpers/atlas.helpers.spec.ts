import {
	loadAtlasTextures,
	makeTileSprite,
	loadSpritesForLayer,
	loadTileBodiesForLayer,
} from './atlas.helpers'
import { cropTexture } from '@client/helpers/sprite.helpers'

const tilesetImage = 'default'

test('Create texture tiles from an image that contains a tileset', () => {
	const mockCropTexture = ((cropTexture as any) = jest.fn())
	const textures = loadAtlasTextures(tilesetImage)

	expect(mockCropTexture).toHaveBeenCalledTimes(5)
	expect(textures).toHaveLength(5)
})
