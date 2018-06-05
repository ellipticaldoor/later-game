import tilesImage from '@client/assets/img/tiles.png'
import { groundTileLayer, topTileLayer } from './atlas.constants'
import { camera } from '@client/camera/camera'
import { getContainerByName } from '@client/camera/camera.helpers'
import {
	loadAtlasTextures,
	loadSpritesForLayer,
	loadTileBodiesForLayer,
} from './helpers/atlas.helpers'

const atlas = {
	textures: [],
	layers: { groundTileLayer, topTileLayer },
	sprites: { ground: undefined, top: undefined },
	bodies: { ground: [] },
}

const setup = () => {
	const { layers, sprites, bodies } = atlas
	atlas.textures = loadAtlasTextures(tilesImage)

	sprites.ground = loadSpritesForLayer(layers.groundTileLayer, atlas.textures)
	sprites.top = loadSpritesForLayer(layers.topTileLayer, atlas.textures)

	bodies.ground = loadTileBodiesForLayer(layers.groundTileLayer)

	const ground = getContainerByName('ground', camera.containers)
	const top = getContainerByName('top', camera.containers)

	ground.container.addChild(...sprites.ground)
	top.container.addChild(...sprites.top)

	return atlas
}

export default setup
