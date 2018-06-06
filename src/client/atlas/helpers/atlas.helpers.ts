import { World } from 'matter-js'
import { Sprite } from '@pixi/sprite'
import { map } from 'ramda'
import { textureOf, cropTexture } from '@client/helpers/sprite.helpers'
import { tileSize } from '@client/constants'
import { staticTiles } from '../atlas.constants'
import { getTilePoint, getTileType, tileLayerIterator } from './utils.helpers'
import { physics } from '@client/physics/physics'
import { makeStaticBody } from '@client/physics/physics.helpers'

export const loadAtlasTextures = (tilesImage: Asset): PIXI.Texture[] => {
	const viewports: Point[] = [
		{ x: 0, y: 0 }, // 1: Grass
		{ x: tileSize, y: 0 }, // 2: Ground
		{ x: tileSize * 2, y: 0 }, // 3: Tree
		{ x: tileSize * 3, y: 0 }, // 4: Top of tree
		{ x: tileSize * 4, y: 0 }, // 5: Bush
	]

	const cropHelper = (viewport: Point): PIXI.Texture =>
		cropTexture(textureOf(tilesImage), viewport)

	return map(cropHelper, viewports)
}

export const makeTileSprite = (
	textures: PIXI.Texture[],
	type: Tile,
	col: number,
	row: number
): PIXI.Sprite => {
	const texture = textures[type - 1]
	const tile = new Sprite(texture)
	const tilePoint = getTilePoint(col, row)

	tile.position.set(tilePoint.x, tilePoint.y)

	return tile
}

export const loadSpritesForLayer = (
	tileLayer: TileLayer,
	textures: PIXI.Texture[]
): PIXI.Sprite[] => {
	const { cols, rows } = tileLayer
	const tileSprites: PIXI.Sprite[] = []

	const makeSprite = (col: number, row: number) => {
		const type = getTileType(tileLayer, col, row)
		if (type) {
			const tile = makeTileSprite(textures, type, col, row)
			tileSprites.push(tile)
		}
	}

	tileLayerIterator(cols, rows, makeSprite)

	return tileSprites
}

export const loadTileBodiesForLayer = (tileLayer: TileLayer): Matter.Body[] => {
	const { cols, rows } = tileLayer
	const bodies: Matter.Body[] = []

	const makeTileBody = (col: number, row: number): void => {
		const type = getTileType(tileLayer, col, row)
		if (staticTiles.includes(type)) {
			const body = makeStaticBody(getTilePoint(col, row))
			bodies.push(body)
		}
	}

	tileLayerIterator(cols, rows, makeTileBody)
	World.add(physics.engine.world, bodies)

	return bodies
}
