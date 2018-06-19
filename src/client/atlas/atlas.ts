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
	const textures = loadAtlasTextures(tilesImage)

	return {
		textures,
		bodies: {
			ground: loadTileBodiesForLayer(groundTileLayer, engine),
		},
		sprites: {
			ground: loadSpritesForLayer(groundTileLayer, textures),
			top: loadSpritesForLayer(topTileLayer, textures),
		},
	}
}

export const loadAtlasSpritesIntoCameraState = (
	{ sprites }: IAtlas,
	{ containers }: ICamera
): void => {
	const groundCamera = getContainerByName('ground', containers)
	const topCamera = getContainerByName('top', containers)

	map(sprite => groundCamera.container.addChild(sprite), sprites.ground)
	map(sprite => topCamera.container.addChild(sprite), sprites.top)
}
