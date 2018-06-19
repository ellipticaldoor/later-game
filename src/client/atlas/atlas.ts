import {
	loadAtlasTextures,
	loadSpritesForLayer,
} from 'client/atlas/atlas.helpers'
import { loadTileBodiesForLayer } from 'common/atlas/helpers/atlas.helpers'
import { groundTileLayer, topTileLayer } from 'common/atlas/atlas.constants'
import { getContainerByName } from 'client/camera/camera.helpers'
import tilesImage from 'client/assets/img/tiles.png'
import { map } from 'ramda'

export const atlasState = ({ engine }: IPhysics): IAtlas => {
	const atlas: IAtlas = {
		textures: [],
		layers: { groundTileLayer, topTileLayer },
		sprites: {},
		bodies: { ground: [] },
	}

	atlas.textures = loadAtlasTextures(tilesImage)

	atlas.bodies.ground = loadTileBodiesForLayer(
		atlas.layers.groundTileLayer,
		engine
	)

	atlas.sprites.ground = loadSpritesForLayer(
		atlas.layers.groundTileLayer,
		atlas.textures
	)
	atlas.sprites.top = loadSpritesForLayer(
		atlas.layers.topTileLayer,
		atlas.textures
	)

	return atlas
}

export const loadAtlasSprites = (
	{ sprites }: IAtlas,
	{ containers }: ICamera
): void => {
	const groundCamera = getContainerByName('ground', containers)
	const topCamera = getContainerByName('top', containers)

	map(sprite => groundCamera.container.addChild(sprite), sprites.ground)
	map(sprite => topCamera.container.addChild(sprite), sprites.top)
}
