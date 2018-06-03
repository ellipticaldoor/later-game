import { map } from 'ramda'
import { camera } from './camera'
import {
	getContainerByName,
	attachContainersToView,
	applyContainersZindex,
	// moveCamera,
	// frameView,
} from './camera.helper'

const testCamera: Camera = { ...camera }
const { view, containers } = testCamera

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
