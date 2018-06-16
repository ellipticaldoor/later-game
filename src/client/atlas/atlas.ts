import { map, isEmpty } from 'ramda'
import { groundTileLayer, topTileLayer } from './atlas.constants'
import { camera } from '@client/camera/camera'
import { physics } from '@client/physics/physics'
import { getContainerByName } from '@client/camera/camera.helpers'
import {
	loadAtlasTextures,
	loadSpritesForLayer,
	loadTileBodiesForLayer,
} from './helpers/atlas.helpers'
const _tilesImage = require('@client/assets/img/tiles.png')
// WARN: Ugly fix for https://github.com/parcel-bundler/parcel/issues/1514
const tilesImage = isEmpty(_tilesImage) ? 'default' : _tilesImage

export const atlas: Atlas = {
	textures: [],
	layers: { groundTileLayer, topTileLayer },
	sprites: {},
	bodies: {},
}

const setup = (): Atlas => {
	const { layers, sprites, bodies } = atlas
	atlas.textures = loadAtlasTextures(tilesImage)

	sprites.ground = loadSpritesForLayer(layers.groundTileLayer, atlas.textures)
	sprites.top = loadSpritesForLayer(layers.topTileLayer, atlas.textures)

	bodies.ground = loadTileBodiesForLayer(layers.groundTileLayer, physics.engine)

	const ground = getContainerByName('ground', camera.containers)
	const top = getContainerByName('top', camera.containers)

	map(sprite => ground.container.addChild(sprite), sprites.ground)
	map(sprite => top.container.addChild(sprite), sprites.top)

	return atlas
}

export default setup
