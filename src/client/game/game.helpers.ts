import { map, has } from 'ramda'
import { spriteOf } from 'client/helpers/sprite.helpers'
import characterImage from 'client/assets/img/character_online.png'

export const updateEntities = (
	entities: any,
	entitiesCamera: IGameContainer,
	serverGameState: IDictionary<IEntity>
): void => {
	// Delete entities that are not present on the state
	map(key => {
		if (!has(key, serverGameState)) {
			entitiesCamera.container.removeChild(entities[key].sprite)
			delete entities[key]
		}
	}, Object.keys(entities))

	// Create and update state entities
	map(([key, entityState]) => {
		if (has(key, entities)) {
			const entity = entities[key]
			entity.state = entityState
			entity.sprite.position.set(entityState.x, entityState.y)
		} else {
			const playerSprite = spriteOf(characterImage)
			playerSprite.position.set(entityState.x, entityState.y)

			entitiesCamera.container.addChild(playerSprite)
			entities[key] = { sprite: playerSprite, state: entityState }
		}
	}, Object.entries(serverGameState))
}
