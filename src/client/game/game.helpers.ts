import { map, has } from 'ramda'
import { spriteOf } from 'client/helpers/sprite.helpers'
import characterImage from 'client/assets/img/character_online.png'

export const updateEntities = (
	entitiesCamera: IGameContainer,
	entitySprites: IDictionary<PIXI.Sprite>,
	gameState: IDictionary<IEntity>
): void => {
	// Delete entities that are not present on the state
	map(key => {
		if (!has(key, gameState)) {
			entitiesCamera.container.removeChild(entitySprites[key])
			delete entitySprites[key]
		}
	}, Object.keys(entitySprites))

	// Create and update state entities
	map(([key, entityState]) => {
		if (has(key, entitySprites)) {
			entitySprites[key].position.set(entityState.x, entityState.y)
		} else {
			const sprite = spriteOf(characterImage)
			entitySprites[key] = sprite

			sprite.position.set(entityState.x, entityState.y)
			entitiesCamera.container.addChild(sprite)
		}
	}, Object.entries(gameState))
}
