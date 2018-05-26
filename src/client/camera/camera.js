import { Container } from 'pixi.js'
import { defaultContainers, defaultCameraSpeed } from './camera.constants'
import { attachContainersToCamera, setContainerZindex } from './camera.helper'

export const camera = {
	view: new Container(),
	containers: defaultContainers,
	speed: defaultCameraSpeed,
}

const setup = ({ stage, ticker }) => {
	const { view, containers } = camera

	stage.addChild(view)
	attachContainersToCamera(view, containers)
	setContainerZindex(view, containers)
}

export default setup
