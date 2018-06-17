import { map, range } from 'ramda'
import { tileSize } from 'client/atlas/atlas.constants'

export const getTileIndex = (
	cols: number,
	{ col, row }: ITileLocation
): number => row * cols + col

export const getTileType = (
	tileLayer: ITileLayer,
	{ col, row }: ITileLocation
): Tile => {
	const tileIndex = getTileIndex(tileLayer.cols, { row, col })

	return tileLayer.tiles[tileIndex]
}

export const getTilePoint = ({ col, row }: ITileLocation): IPoint => ({
	x: col * tileSize,
	y: row * tileSize,
})

export const tileLayerIterator = (
	cols: number,
	rows: number,
	method: ({ col, row }: ITileLocation) => void
): void => {
	map(col => {
		map(row => {
			method({ col, row })
		}, range(0, rows))
	}, range(0, cols))
}
