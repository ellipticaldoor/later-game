import cameraSetup, { camera } from './camera'
import { defaultContainers } from './camera.constants'
import { getContainerByName } from './camera.helpers'
import { pixiMock } from '@client/constants/testing'

const pixi = Object.assign({}, pixiMock)

describe('Camera setup', () => {
	cameraSetup(pixi)
	const { view, containers } = camera

	test('The main camera view was added to the game view', () => {
		expect(pixi.stage.addChild).toHaveBeenCalledTimes(1)
	})

	test('The default containers were added to the main camera view', () => {
		expect(camera.view.children.length).toBe(defaultContainers.length)
	})

	test('View containers have their default zIndex', () => {
		const ground = getContainerByName('ground', containers)
		const entities = getContainerByName('entities', containers)
		const top = getContainerByName('top', containers)

		const _ground = getContainerByName('ground', defaultContainers)
		const _entities = getContainerByName('entities', defaultContainers)
		const _top = getContainerByName('top', defaultContainers)

		expect(view.getChildIndex(ground.container)).toBe(_ground.zIndex)
		expect(view.getChildIndex(entities.container)).toBe(_entities.zIndex)
		expect(view.getChildIndex(top.container)).toBe(_top.zIndex)
	})
})
