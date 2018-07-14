import { map, propEq, find } from 'ramda'
import { TILE_SIZE } from 'tiles/tiles.constants'

export const getContainerByName = (
	name: string,
	containers: IGameContainer[]
): IGameContainer => find(propEq('name', name))(containers)

export const attachContainersToView = (
	view: PIXI.Container,
	containers: IGameContainer[]
): void => {
	map(({ name, container }: IGameContainer) => {
		view.addChild(container)
		container.name = name
	}, containers)
}

export const applyContainersZindex = (
	view: PIXI.Container,
	containers: IGameContainer[]
): void => {
	map(({ container, zIndex }: IGameContainer) => {
		view.setChildIndex(container, zIndex)
	}, containers)
}

export const moveCamera = (
	delta: number,
	view: PIXI.Container,
	speed: number,
	dir: IDirection
): void => {
	view.position.x += dir.x * speed * delta * -1
	view.position.y += dir.y * speed * delta * -1
}

export const frameView = (
	renderer: PIXI.Renderer,
	view: PIXI.Container,
	moveTo: IPoint
): void => {
	const screenCenter: IPoint = {
		x: Math.floor(renderer.screen.width / 2 - moveTo.x),
		y: Math.floor(renderer.screen.height / 2 - moveTo.y),
	}

	const centerX = screenCenter.x - TILE_SIZE / 2
	const centerY = screenCenter.y - TILE_SIZE / 2

	view.position.set(centerX, centerY)
}
