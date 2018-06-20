import { atlasState, loadAtlasSprites } from 'client/atlas/atlas'
import { physicsState } from 'client/physics/physics'
import { cropTexture } from 'client/helpers/sprite.helpers'
import { cameraState } from 'client/camera/camera'
import { getContainerByName } from 'client/camera/camera.helpers'

describe('Atlas setup', () => {
	const mockCropTexture = ((cropTexture as any) = jest.fn())
	const atlas = atlasState(physicsState())

	test('New atlas state', () => {
		expect(atlas)
	})

	test('The textures have been loaded', () => {
		expect(mockCropTexture).toHaveBeenCalledTimes(5)
		expect(atlas.textures).toHaveLength(5)
	})

	test('Sprite loading into the camera container', () => {
		const camera = cameraState()
		loadAtlasSprites(atlas, camera)

		const groundCamera = getContainerByName('ground', camera.containers)
		const topCamera = getContainerByName('top', camera.containers)

		expect(groundCamera.container.children.length).toBeGreaterThan(0)
		expect(topCamera.container.children.length).toBeGreaterThan(0)
	})
})
