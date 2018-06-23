import { World } from 'matter-js'
import { staticTiles } from 'common/atlas/atlas.constants'
import {
	getTilePoint,
	getTileType,
	tileLayerIterator,
} from './utils.atlas.helpers'
import { makeBody } from 'common/physics/physics.helpers'

export const loadTileBodiesForLayer = (
	tileLayer: ITileLayer,
	engine: Matter.Engine
): Matter.Body[] => {
	const { cols, rows } = tileLayer
	const bodies: Matter.Body[] = []

	const addTileBody = ({ col, row }: ITileLocation): void => {
		const type = getTileType(tileLayer, { col, row })
		if (staticTiles.includes(type)) {
			const body = makeBody(engine, getTilePoint({ col, row }), 'tile')
			bodies.push(body)
		}
	}

	tileLayerIterator(cols, rows, addTileBody)
	World.add(engine.world, bodies)

	return bodies
}
