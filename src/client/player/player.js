import characterImage from '@client/assets/img/character.png'
import { spriteOf } from '@client/helpers/sprite.helpers'
import { camera } from '@client/camera/camera'
import { getContainerByName } from '@client/camera/camera.helpers'
import { getTileXY } from '@client/atlas/helpers/utils.helpers'
import { makeBody, updateEntityPosition } from '@client/physics/physics.helpers'
const initialPlayerXY = getTileXY(2, 3)

export const player = {
	sprite: spriteOf(characterImage),
	body: makeBody(...initialPlayerXY),
	force: 0.8,
}

const gameLoop = (delta, { sprite, body }) => {
	updateEntityPosition(sprite, body)
}

const setup = ({ ticker }) => {
	player.sprite.position.set(...initialPlayerXY)

	const entities = getContainerByName('entities', camera.containers)
	entities.container.addChild(player.sprite)

	ticker.add(delta => gameLoop(delta, player))

	return player
}

export default setup
