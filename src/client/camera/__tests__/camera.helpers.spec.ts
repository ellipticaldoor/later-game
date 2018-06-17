import { pixiMock } from 'client/constants/testing'
import { camera } from 'client/camera/camera'
import {
	getContainerByName,
	attachContainersToView,
	applyContainersZindex,
	moveCamera,
	frameView,
} from 'client/camera/camera.helpers'

const testCamera = Object.assign({}, camera)
const { view, containers } = testCamera
const speed = 1
const delta = 1

test('Get a container by name', () => {
	const ground = getContainerByName('ground', containers)
	const entities = getContainerByName('entities', containers)
	const top = getContainerByName('top', containers)

	expect(ground.name).toBe('ground')
	expect(entities.name).toBe('entities')
	expect(top.name).toBe('top')
})

test('Attach the camera containers to the main view PIXI container', () => {
	attachContainersToView(view, containers)
	expect(view.children.length).toBe(3)
})

test('Apply zIndex to the child containers of the main view', () => {
	const ground = getContainerByName('ground', containers)
	const entities = getContainerByName('entities', containers)
	const top = getContainerByName('top', containers)

	ground.zIndex = 2
	entities.zIndex = 0
	top.zIndex = 1

	applyContainersZindex(view, containers)

	expect(view.getChildIndex(ground.container)).toBe(2)
	expect(view.getChildIndex(entities.container)).toBe(0)
	expect(view.getChildIndex(top.container)).toBe(1)
})

describe('Move camera position', () => {
	beforeEach(() => {
		view.position.set(0, 0)
	})

	test('Move camera position UP', () => {
		moveCamera(delta, view, speed, { x: 0, y: -1 })

		expect(view.position.x).toBe(0)
		expect(view.position.y).toBe(1)
	})

	test('Move camera position DOWN', () => {
		moveCamera(delta, view, speed, { x: 0, y: 1 })

		expect(view.position.x).toBe(0)
		expect(view.position.y).toBe(-1)
	})

	test('Move camera position RIGTH', () => {
		moveCamera(delta, view, speed, { x: 1, y: 0 })

		expect(view.position.x).toBe(-1)
		expect(view.position.y).toBe(0)
	})

	test('Move camera position LEFT', () => {
		moveCamera(delta, view, speed, { x: -1, y: 0 })

		expect(view.position.x).toBe(1)
		expect(view.position.y).toBe(0)
	})
})

test('Frame a point in the center of a camera', () => {
	const playerPosition: IPoint = { x: 200, y: 400 }

	view.position.set(0, 0)

	frameView(pixiMock.renderer, view, playerPosition)

	expect(view.position.x).toBe(728)
	expect(view.position.y).toBe(108)
})
