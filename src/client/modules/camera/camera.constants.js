import { Container } from 'pixi.js'

export const defaultContainers = {
	ground: { zIndex: 0, container: new Container() },
	entities: { zIndex: 1, container: new Container() },
	top: { zIndex: 2, container: new Container() },
}

export const defaultCameraSpeed = 12
