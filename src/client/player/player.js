import characterImage from '@client/assets/img/character.png'
import { spriteOf } from '@client/helpers/sprite.helpers'
import { camera } from '@client/camera/camera'
import { getContainerByName } from '@client/camera/camera.helpers'
import { getTilePoint } from '@client/atlas/helpers/utils.helpers'
import { makeBody, updateEntityPosition } from '@client/physics/physics.helpers'
const initialPlayerPoint = getTilePoint(2, 3)

export const player = {
	sprite: spriteOf(characterImage),
	body: makeBody(initialPlayerPoint),
	force: 0.8,
}

const gameLoop = (delta, { sprite, body }) => {
	updateEntityPosition(sprite, body)
}

const setup = ({ ticker }) => {
	player.sprite.position.set(initialPlayerPoint.x, initialPlayerPoint.y)

	const entities = getContainerByName('entities', camera.containers)
	entities.container.addChild(player.sprite)

	ticker.add(delta => gameLoop(delta, player))

	return player
}

export default setup
