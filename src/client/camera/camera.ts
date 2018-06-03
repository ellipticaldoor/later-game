import { Container } from 'pixi.js'
import { defaultContainers, defaultCameraSpeed } from './camera.constants'
import { attachContainersToView, applyContainersZindex } from './camera.helper'

export const camera: Camera = {
	view: new Container(),
	containers: defaultContainers,
	speed: defaultCameraSpeed,
}

const setup = ({ stage }: PIXI.Application) => {
	stage.addChild(camera.view)
	attachContainersToView(camera.view, camera.containers)
	applyContainersZindex(camera.view, camera.containers)

	return camera
}

export default setup
