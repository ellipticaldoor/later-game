import characterImage from '@client/assets/img/character.png'
import { spriteOf } from '@client/helpers/sprite.helper'
import { camera } from '@client/camera/camera'
import { getTileXY } from '@client/atlas/helpers/utils.helper'
import { makeBody, updateEntityPosition } from '@client/physics/physics.helper'

export const player = {
	sprite: undefined,
	body: undefined,
	force: 0.8,
}

const gameLoop = (delta, { sprite, body }) => {
	updateEntityPosition(sprite, body)
}

const setup = ({ ticker }) => {
	const initialPlayerXY = getTileXY(2, 3)

	player.sprite = spriteOf(characterImage)
	player.sprite.position.set(...initialPlayerXY)
	player.body = makeBody(...initialPlayerXY)

	camera.containers.entities.container.addChild(player.sprite)

	ticker.add(delta => gameLoop(delta, player))
}

export default setup
