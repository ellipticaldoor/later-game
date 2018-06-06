import { map, range } from 'ramda'
import { tileSize } from '@client/constants'

export const getTileIndex = (
	cols: number,
	{ col, row }: TileLocation
): number => row * cols + col

export const getTileType = (
	tileLayer: TileLayer,
	col: number,
	row: number
): Tile => {
	const tileIndex = getTileIndex(tileLayer.cols, { row, col })

	return tileLayer.data[tileIndex]
}

export const getTilePoint = ({ col, row }: TileLocation): Point => ({
	x: col * tileSize,
	y: row * tileSize,
})

export const tileLayerIterator = (
	cols: number,
	rows: number,
	method: any // TODO: Don't use any
): void => {
	map(col => map(row => method({ col, row }), range(0, rows)), range(0, cols))
}
