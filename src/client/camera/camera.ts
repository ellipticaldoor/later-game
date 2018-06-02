import { Container } from 'pixi.js'
import { defaultContainers, defaultCameraSpeed } from './camera.constants'
import { attachContainersToCamera, setContainerZindex } from './camera.helper'

export const camera: Camera = {
	view: new Container(),
	containers: defaultContainers,
	speed: defaultCameraSpeed,
}

const setup = ({ stage }: PIXI.Application) => {
	stage.addChild(camera.view)
	attachContainersToCamera(camera.view, camera.containers)
	setContainerZindex(camera.view, camera.containers)
}

export default setup
