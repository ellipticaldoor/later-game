import { cameraState } from 'client/camera/camera'
import { defaultContainers } from 'client/camera/camera.constants'
import { getContainerByName } from 'client/camera/camera.helpers'

describe('Camera setup', () => {
	const camera = cameraState()
	const { view, containers } = camera

	test('The default containers were added to the main camera view', () => {
		expect(camera.view.children.length).toBe(defaultContainers.length)
	})

	test('View containers have their default zIndex', () => {
		const ground = getContainerByName('ground', containers)
		const entities = getContainerByName('entities', containers)
		const top = getContainerByName('top', containers)

		const defaultGround = getContainerByName('ground', defaultContainers)
		const defaultEntities = getContainerByName('entities', defaultContainers)
		const defaultTop = getContainerByName('top', defaultContainers)

		expect(view.getChildIndex(ground.container)).toBe(defaultGround.zIndex)
		expect(view.getChildIndex(entities.container)).toBe(defaultEntities.zIndex)
		expect(view.getChildIndex(top.container)).toBe(defaultTop.zIndex)
	})
})
