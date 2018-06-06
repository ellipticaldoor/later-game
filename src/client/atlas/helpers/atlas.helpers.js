import { World } from 'matter-js'
import { Sprite } from '@pixi/sprite'
import { map } from 'ramda'
import { textureOf, cropTexture } from '@client/helpers/sprite.helpers'
import { tileSize } from '@client/constants'
import { staticTiles } from '../atlas.constants'
import { getTilePoint, getTileType, tileLayerIterator } from './utils.helpers'
import { physics } from '@client/physics/physics'
import { makeStaticBody } from '@client/physics/physics.helpers'

export const loadAtlasTextures = tilesImage => {
	const viewports = [
		{ x: 0, y: 0 }, // 1: Grass
		{ x: tileSize, y: 0 }, // 2: Ground
		{ x: tileSize * 2, y: 0 }, // 3: Tree
		{ x: tileSize * 3, y: 0 }, // 4: Top of the tree
		{ x: tileSize * 4, y: 0 }, // 5: Bush
	]

	const cropHelper = viewport => cropTexture(textureOf(tilesImage), viewport)

	return map(cropHelper, viewports)
}

export const makeTileSprite = (textures, type, col, row) => {
	if (type) {
		const texture = textures[type - 1]
		const tile = new Sprite(texture)
		const tilePoint = getTilePoint(col, row)

		tile.position.set(tilePoint.x, tilePoint.y)

		return tile
	} else {
		console.warn(`Tile type of value: "${type}" is not valid.`)
	}
}

export const loadSpritesForLayer = (tileLayer, textures) => {
	const { cols, rows } = tileLayer
	const tileSprites = []

	const makeSprite = (col, row) => {
		const type = getTileType(tileLayer, col, row)
		if (type) {
			const tile = makeTileSprite(textures, type, col, row)
			tileSprites.push(tile)
		}
	}

	tileLayerIterator(cols, rows, makeSprite)

	return tileSprites
}

export const loadTileBodiesForLayer = tileLayer => {
	const { cols, rows } = tileLayer
	const bodies = []

	const makeTileBody = (col, row) => {
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