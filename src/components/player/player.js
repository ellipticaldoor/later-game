import characterImage from '~/assets/img/character.png'
import { spriteOf } from '~/helpers/sprite.helpers'
import { camera } from '~/components/camera/camera'
import { getTileXY } from '~/components/atlas/helpers/utils.helpers'
import {
	makeBody,
	updateEntityPosition,
} from '~/components/physics/physics.helpers'

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
