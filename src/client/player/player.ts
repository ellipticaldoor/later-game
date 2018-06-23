import { spriteOf } from 'client/helpers/sprite.helpers'
import { getContainerByName } from 'client/camera/camera.helpers'
import { getTilePoint } from 'common/atlas/helpers/utils.atlas.helpers'
import { makeBody, syncSpritePosition } from 'common/physics/physics.helpers'
import characterImage from 'client/assets/img/character.png'

export const playerState = ({ engine }: IPhysics): IPlayer => {
	const initialPlayerPoint = getTilePoint({ col: 2, row: 3 })
	const sprite = spriteOf(characterImage)
	sprite.position.set(initialPlayerPoint.x, initialPlayerPoint.y)

	return {
		sprite,
		body: makeBody(engine, initialPlayerPoint, 'player'),
		speed: 0.06,
		frame: true, // Tells if the player is centered in the screen
	}
}

export const loadPlayerSprite = (
	{ sprite }: IPlayer,
	{ containers }: ICamera
): void => {
	const entitiesCamera = getContainerByName('entities', containers)
	entitiesCamera.container.addChild(sprite)
}

export const playerGameLoop = ({ sprite, body }: IPlayer): void => {
	syncSpritePosition(sprite, body)
}
