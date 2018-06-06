import { groundTileLayer, topTileLayer } from './atlas.constants'
import { camera } from '@client/camera/camera'
import { getContainerByName } from '@client/camera/camera.helpers'
import {
	loadAtlasTextures,
	loadSpritesForLayer,
	loadTileBodiesForLayer,
} from './helpers/atlas.helpers'

const atlas: Atlas = {
	textures: [],
	layers: { groundTileLayer, topTileLayer },
	sprites: {},
	bodies: {},
}

const setup = (): Atlas => {
	const { layers, sprites, bodies } = atlas
	atlas.textures = loadAtlasTextures(require('@client/assets/img/tiles.png'))

	sprites.ground = loadSpritesForLayer(layers.groundTileLayer, atlas.textures)
	sprites.top = loadSpritesForLayer(layers.topTileLayer, atlas.textures)

	bodies.ground = loadTileBodiesForLayer(layers.groundTileLayer)

	const ground = getContainerByName('ground', camera.containers)
	const top = getContainerByName('top', camera.containers)

	// @ts-ignore
	ground.container.addChild(...sprites.ground)
	// @ts-ignore
	top.container.addChild(...sprites.top)

	return atlas
}

export default setup
