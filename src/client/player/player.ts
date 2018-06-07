import { spriteOf } from '@client/helpers/sprite.helpers'
import { camera } from '@client/camera/camera'
import { getContainerByName } from '@client/camera/camera.helpers'
import { getTilePoint } from '@client/atlas/helpers/utils.helpers'
import { makeBody, syncSpritePosition } from '@client/physics/physics.helpers'
import { physics } from '@client/physics/physics'
const initialPlayerPoint = getTilePoint({ col: 2, row: 3 })

export const player = {
	sprite: spriteOf(require('@client/assets/img/character.png')),
	body: makeBody(physics.engine, initialPlayerPoint, 'entity'),
	force: 0.8,
}

const gameLoop = (sprite: PIXI.Sprite, body: Matter.Body): void => {
	syncSpritePosition(sprite, body)
}

const setup = ({ ticker }: PIXI.Application): Player => {
	player.sprite.position.set(initialPlayerPoint.x, initialPlayerPoint.y)

	const entities = getContainerByName('entities', camera.containers)
	entities.container.addChild(player.sprite)

	ticker.add(() => gameLoop(player.sprite, player.body))

	return player
}

export default setup
