import {
	getTileIndex,
	getTileType,
	getTilePoint,
	tileLayerIterator,
} from './utils.atlas.helpers'

// prettier-ignore
const tileLayer: TileLayer = {
	zIndex: 0,
	cols: 4,
	rows: 4,
	data: [
		0, 0, 0, 0,
		0, 1, 1, 1,
		0, 1, 2, 2,
		0, 1, 2, 3,
	],
}

test('Get the index of a tile based on its location', () => {
	const tileLocation: TileLocation = { col: 1, row: 1 }

	const index = getTileIndex(tileLayer.cols, tileLocation)

	expect(index).toBe(5)
})
