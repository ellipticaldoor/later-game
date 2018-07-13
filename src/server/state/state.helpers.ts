import { reduce } from 'ramda'

export const updateGamestate = (entities: IDictionary<Matter.Body>): any =>
	reduce(
		(acc, [id, entity]) => {
			acc[id] = {
				label: entity.label,
				x: Math.trunc(entity.position.x),
				y: Math.trunc(entity.position.y),
			}

			return acc
		},
		{} as any,
		Object.entries(entities)
	)
