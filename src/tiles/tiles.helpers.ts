import { World } from 'matter-js'
import { makeBody } from 'physics/physics.helpers'
import { STATIC_TILES } from 'tiles/tiles.constants'
import { getTilePoint, getTileType, tileLayerIterator } from 'tiles/tiles.utils'

export const loadTileBodies = (
	engine: Matter.Engine,
	tileLayer: ITileLayer
): Matter.Body[] => {
	const bodies: Matter.Body[] = []

	const addTileBody = ({ col, row }: ITileLocation): void => {
		const type = getTileType(tileLayer, { col, row })

		if (STATIC_TILES.includes(type)) {
			const body = makeBody(engine, getTilePoint({ col, row }), 'tile')
			bodies.push(body)
		}
	}

	const { cols, rows } = tileLayer
	tileLayerIterator(cols, rows, addTileBody)
	World.add(engine.world, bodies)

	return bodies
}
