import { map, range } from 'ramda'
import { tileSize } from '@client/constants'

export const getTileIndex = (row: number, col: number, cols: number): number =>
	row * cols + col

export const getTileType = (
	tileLayer: TileLayer,
	col: number,
	row: number
): Tile => {
	const tileIndex = getTileIndex(row, col, tileLayer.cols)

	return tileLayer.data[tileIndex]
}

export const getTilePoint = (col: number, row: number): Point => ({
	x: col * tileSize,
	y: row * tileSize,
})

export const tileLayerIterator = (
	cols: number,
	rows: number,
	method: any
): void => {
	map(col => map(row => method(col, row), range(0, rows)), range(0, cols))
}
