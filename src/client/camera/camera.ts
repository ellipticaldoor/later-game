import { Container } from 'pixi.js'
import { defaultContainers, defaultCameraSpeed } from './camera.constants'
import { attachContainersToView, applyContainersZindex } from './camera.helpers'

export const cameraState = (): ICamera => {
	const camera: ICamera = {
		view: new Container(),
		containers: defaultContainers,
		speed: defaultCameraSpeed,
	}

	attachContainersToView(camera.view, camera.containers)
	applyContainersZindex(camera.view, camera.containers)

	return camera
}
