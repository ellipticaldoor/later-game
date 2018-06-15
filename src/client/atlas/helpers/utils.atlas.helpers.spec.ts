import {
	getTileIndex,
	getTileType,
	getTilePoint,
	tileLayerIterator,
} from './utils.atlas.helpers'
import { map } from 'ramda'

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

test('Get the value type of a tile based on its location', () => {
	const tileLocation: TileLocation = { col: 1, row: 1 }

	const value = getTileType(tileLayer, tileLocation)

	expect(value).toBe(1)
})

test('Get the coordinates where the a tile is going to be drawed based in its location', () => {
	const tileLocation: TileLocation = { col: 12, row: 1 }

	const coordinates = getTilePoint(tileLocation)

	expect(coordinates).toEqual({ x: 768, y: 64 })
})

test('Iteration over all tiles', () => {
	const method = jest.fn()

	tileLayerIterator(tileLayer.cols, tileLayer.rows, method)

	expect(method).toHaveBeenCalledTimes(tileLayer.cols * tileLayer.rows)

	map(([call]) => {
		expect(call).toHaveProperty('col')
		expect(call).toHaveProperty('row')
	}, method.mock.calls)
})
