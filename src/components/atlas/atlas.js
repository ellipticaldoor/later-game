import tilesImage from '~/assets/img/tiles.png'
import { groundTileLayer, topTileLayer } from './atlas.constants'
import {
	loadAtlasTextures,
	loadSpritesForLayer,
	loadBodiesForLayer,
} from './helpers/atlas.helpers'
import { camera } from '~/components/camera/camera'

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

	bodies.ground = loadBodiesForLayer(layers.groundTileLayer)

	const { ground, top } = camera.containers
	ground.container.addChild(...sprites.ground)
	top.container.addChild(...sprites.top)
}

export default setup
