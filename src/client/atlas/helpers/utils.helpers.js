import { map, range } from 'ramda'
import { tileSize } from '@client/constants'

export const getTileIndex = (row, col, cols) => row * cols + col

export const getTileType = (tileLayer, col, row) => {
	const tileIndex = getTileIndex(row, col, tileLayer.cols)
	return tileLayer.data[tileIndex]
}

export const getTilePoint = (col, row) => ({
	x: col * tileSize,
	y: row * tileSize,
})

export const tileLayerIterator = (cols, rows, method) => {
	map(col => map(row => method(col, row), range(0, rows)), range(0, cols))
}
