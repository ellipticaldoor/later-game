import { World } from 'matter-js'
import { STATIC_TILES } from 'tiles/tiles.constants'
import {
	getTilePoint,
	getTileType,
	tileLayerIterator,
} from './utils.tiles.helpers'
import { makeBody } from 'physics/physics.helpers'

export const loadBodiesFromTiles = (
	tileLayer: ITileLayer,
	engine: Matter.Engine
): Matter.Body[] => {
	const { cols, rows } = tileLayer
	const bodies: Matter.Body[] = []

	const addTileBody = ({ col, row }: ITileLocation): void => {
		const type = getTileType(tileLayer, { col, row })
		if (STATIC_TILES.includes(type)) {
			const body = makeBody(engine, getTilePoint({ col, row }), 'tile')
			bodies.push(body)
		}
	}

	tileLayerIterator(cols, rows, addTileBody)
	World.add(engine.world, bodies)

	return bodies
}
