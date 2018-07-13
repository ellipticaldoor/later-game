import { reduce } from 'ramda'

export const updateGamestate = (entities: IDictionary<Matter.Body>) =>
	reduce(
		(acc, entityId) => {
			const entity = entities[entityId]

			acc[entityId] = {
				label: entity.label,
				x: Math.trunc(entity.position.x),
				y: Math.trunc(entity.position.y),
			}

			return acc
		},
		{} as any,
		Object.keys(entities)
	)
