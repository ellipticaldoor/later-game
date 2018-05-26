import { map } from 'ramda'
import { tileSize } from '@client/constants'

export const attachContainersToCamera = (camera, containers) => {
	map(({ container }) => camera.addChild(container), containers)
}

export const setContainerZindex = (camera, containers) => {
	map(
		({ container, zIndex }) => camera.setChildIndex(container, zIndex),
		containers
	)
}

export const moveCamera = (delta, view, speed, dirX, dirY) => {
	view.position.x += dirX * speed * delta
	view.position.y += dirY * speed * delta
}

export const frameCamera = (renderer, { position }, x, y) => {
	const _x = Math.floor(renderer.screen.width / 2 - x)
	const _y = Math.floor(renderer.screen.height / 2 - y)

	const centerX = _x - tileSize / 2
	const centerY = _y - tileSize / 2

	position.set(centerX, centerY)
}
