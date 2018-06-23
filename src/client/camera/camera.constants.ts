import { Container } from 'pixi.js'

export const defaultContainers: IGameContainer[] = [
	{ name: 'ground', zIndex: 0, container: new Container() },
	{ name: 'entities', zIndex: 1, container: new Container() },
	{ name: 'top', zIndex: 2, container: new Container() },
]

export const defaultCameraSpeed = 0.8
