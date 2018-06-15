import { World } from 'matter-js'
import { Sprite } from '@pixi/sprite'
import { map } from 'ramda'
import { textureOf, cropTexture } from '@client/helpers/sprite.helpers'
import { tileSize } from '@client/constants'
import { staticTiles } from '../atlas.constants'
import {
	getTilePoint,
	getTileType,
	tileLayerIterator,
} from './utils.atlas.helpers'
import { makeBody } from '@client/physics/physics.helpers'

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
	type: Tile,
	{ col, row }: TileLocation,
	textures: PIXI.Texture[]
): PIXI.Sprite => {
	const texture = textures[type - 1]
	const tile = new Sprite(texture)
	const tilePoint = getTilePoint({ col, row })

	tile.position.set(tilePoint.x, tilePoint.y)

	return tile
}

export const loadSpritesForLayer = (
	tileLayer: TileLayer,
	textures: PIXI.Texture[]
): PIXI.Sprite[] => {
	const { cols, rows } = tileLayer
	const tileSprites: PIXI.Sprite[] = []

	const addTileSprite = ({ col, row }: TileLocation) => {
		const type = getTileType(tileLayer, { col, row })
		if (type) {
			const tile = makeTileSprite(type, { col, row }, textures)
			tileSprites.push(tile)
		}
	}

	tileLayerIterator(cols, rows, addTileSprite)

	return tileSprites
}

export const loadTileBodiesForLayer = (
	tileLayer: TileLayer,
	engine: Matter.Engine
): Matter.Body[] => {
	const { cols, rows } = tileLayer
	const bodies: Matter.Body[] = []

	const addTileBody = ({ col, row }: TileLocation): void => {
		const type = getTileType(tileLayer, { col, row })
		if (staticTiles.includes(type)) {
			const body = makeBody(engine, getTilePoint({ col, row }), 'static')
			bodies.push(body)
		}
	}

	tileLayerIterator(cols, rows, addTileBody)
	World.add(engine.world, bodies)

	return bodies
}
