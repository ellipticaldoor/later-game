import { map } from 'ramda'
import { camera } from './camera'
import {
	attachContainersToView,
	// applyContainersZindex,
	// moveCamera,
	// frameView,
} from './camera.helper'

const testCamera: Camera = { ...camera }

test('Attach the camera containers to the main view PIXI container', () => {
	attachContainersToView(testCamera.view, testCamera.containers)
	expect(testCamera.view.children.length).toBe(3)
})

test('Apply zIndex to the child containers of the main view', () => {
	// console.log(testCamera.view.getChildByName('ground'))
	// testCamera.containers['ground'].zIndex = 1
	// testCamera.containers['entities'].zIndex = 0
	// testCamera.containers['top'].zIndex = 2
	// applyContainersZindex(testCamera.view, testCamera.containers)
	// const { getChildIndex } = testCamera.view
	// console.log(testCamera.view.children[0].)
	// expect(getChildIndex(testCamera.view.children[0])).toBe(1)
	// map(({ container }: GameContainer) => {
	// 	console.log(testCamera.view.getChildIndex(container))
	// }, Object.values(testCamera.containers))
	// console.log(testCamera.view.getChildIndex())
	// expect(testCamera.view.children.length).toBe(3)
})

// test('Get a container by name from an array of containers', () => {
// 	const ground: PIXI.Container = selectContainer(
// 		'ground',
// 		testCamera.containers
// 	)
// 	console.log(ground)
// 	expect(testCamera.view.children.length).toBe(3)
// })
