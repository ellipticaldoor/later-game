import {
	loadAtlasTextures,
	loadSpritesForLayer,
} from 'client/atlas/atlas.helpers'
import { loadTileBodiesForLayer } from 'common/atlas/helpers/atlas.helpers'
import { groundTileLayer, topTileLayer } from 'common/atlas/atlas.constants'
import { camera } from 'client/camera/camera'
import { physics } from 'client/physics/physics'
import { getContainerByName } from 'client/camera/camera.helpers'
import tilesImage from 'client/assets/img/tiles.png'
import { map } from 'ramda'

export const atlas: IAtlas = {
	textures: [],
	layers: { groundTileLayer, topTileLayer },
	sprites: {},
	bodies: {},
}

const setup = (): IAtlas => {
	const { layers, sprites, bodies } = atlas

	bodies.ground = loadTileBodiesForLayer(layers.groundTileLayer, physics.engine)

	atlas.textures = loadAtlasTextures(tilesImage)

	sprites.ground = loadSpritesForLayer(layers.groundTileLayer, atlas.textures)
	sprites.top = loadSpritesForLayer(layers.topTileLayer, atlas.textures)

	const ground = getContainerByName('ground', camera.containers)
	const top = getContainerByName('top', camera.containers)

	map(sprite => ground.container.addChild(sprite), sprites.ground)
	map(sprite => top.container.addChild(sprite), sprites.top)

	return atlas
}

export default setup
