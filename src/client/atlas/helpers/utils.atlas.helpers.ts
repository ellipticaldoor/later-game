import { map, range } from 'ramda'
import { tileSize } from '@client/constants'

export const getTileIndex = (
	cols: number,
	{ col, row }: TileLocation
): number => row * cols + col

export const getTileType = (
	tileLayer: TileLayer,
	{ col, row }: TileLocation
): Tile => {
	const tileIndex = getTileIndex(tileLayer.cols, { row, col })

	return tileLayer.tiles[tileIndex]
}

export const getTilePoint = ({ col, row }: TileLocation): Point => ({
	x: col * tileSize,
	y: row * tileSize,
})

export const tileLayerIterator = (
	cols: number,
	rows: number,
	method: ({ col, row }: TileLocation) => void
): void => {
	map(col => {
		map(row => {
			method({ col, row })
		}, range(0, rows))
	}, range(0, cols))
}
