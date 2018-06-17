import { Container } from 'pixi.js'
import { defaultContainers, defaultCameraSpeed } from './camera.constants'
import { attachContainersToView, applyContainersZindex } from './camera.helpers'

export const camera: ICamera = {
	view: new Container(),
	containers: defaultContainers,
	speed: defaultCameraSpeed,
}

const setup = ({ stage }: PIXI.Application): ICamera => {
	stage.addChild(camera.view)
	attachContainersToView(camera.view, camera.containers)
	applyContainersZindex(camera.view, camera.containers)

	return camera
}

export default setup
