import { map } from 'ramda'
import { tileSize } from '@client/constants'

export const attachContainersToView = (
	view: PIXI.Container,
	containers: Dictionary<GameContainer>
): void => {
	map(({ container }: GameContainer) => {
		view.addChild(container)
	}, Object.values(containers))
}

export const applyContainersZindex = (
	view: PIXI.Container,
	containers: Dictionary<GameContainer>
): void => {
	map(({ container, zIndex }: GameContainer) => {
		view.setChildIndex(container, zIndex)
	}, Object.values(containers))
}

export const moveCamera = (
	delta: number,
	view: PIXI.Container,
	speed: number,
	dirX: number,
	dirY: number
): void => {
	view.position.x += dirX * speed * delta
	view.position.y += dirY * speed * delta
}

export const frameView = (
	renderer: PIXI.Renderer,
	view: PIXI.Container,
	moveTo: Point
): void => {
	const _moveTo: Point = {
		x: Math.floor(renderer.screen.width / 2 - moveTo.x),
		y: Math.floor(renderer.screen.height / 2 - moveTo.y),
	}

	const centerX = _moveTo.x - tileSize / 2
	const centerY = _moveTo.y - tileSize / 2

	view.position.set(centerX, centerY)
}
