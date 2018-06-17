import { loadTileBodiesForLayer } from 'common/atlas/helpers/atlas.helpers'
import { staticTiles } from 'common/atlas/atlas.constants'
import { physics } from 'client/physics/physics'
import { filter, map } from 'ramda'

// prettier-ignore
const tileLayer: ITileLayer = {
	zIndex: 0,
	cols: 4,
	rows: 4,
	tiles: [
		0, 0, 0, 0,
		0, 1, 1, 1,
		0, 1, 2, 3,
		0, 1, 3, 3,
	],
}

test('Make a new matter-js body for each non empty tile', () => {
	const bodies = loadTileBodiesForLayer(tileLayer, physics.engine)

	const totalStaticTiles = filter(
		tile => (staticTiles.includes(tile) ? true : false),
		tileLayer.tiles
	)

	expect(bodies).toHaveLength(totalStaticTiles.length)
	map(body => {
		expect(body.type).toBe('body')
	}, bodies)
})
