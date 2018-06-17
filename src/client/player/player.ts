import { spriteOf } from 'client/helpers/sprite.helpers'
import { camera } from 'client/camera/camera'
import { getContainerByName } from 'client/camera/camera.helpers'
import { getTilePoint } from 'common/atlas/helpers/utils.atlas.helpers'
import { makeBody, syncSpritePosition } from 'common/physics/physics.helpers'
import { physics } from 'client/physics/physics'
import characterImage from 'client/assets/img/character.png'

const initialPlayerPoint = getTilePoint({ col: 2, row: 3 })

export const player: IPlayer = {
	sprite: spriteOf(characterImage),
	body: makeBody(physics.engine, initialPlayerPoint, 'entity'),
	speed: 0.8,
	frame: true, // Tells if the player is centered in the screen
}

const gameLoop = (sprite: PIXI.Sprite, body: Matter.Body): void => {
	syncSpritePosition(sprite, body)
}

const setup = ({ ticker }: PIXI.Application): IPlayer => {
	player.sprite.position.set(initialPlayerPoint.x, initialPlayerPoint.y)

	const entities = getContainerByName('entities', camera.containers)
	entities.container.addChild(player.sprite)

	ticker.add(() => gameLoop(player.sprite, player.body))

	return player
}

export default setup
