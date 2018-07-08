interface ITileLocation {
	col: number
	row: number
}

type Tile =
	| 0 // Empty
	| 1 // Grass
	| 2 // Ground
	| 3 // Tree
	| 4 // TopOfTree
	| 5 // Bush

interface ITileLayer {
	zIndex: number
	cols: number
	rows: number
	tiles: Tile[]
}

interface IAtlas {
	textures: PIXI.Texture[]
	bodies: IDictionary<Matter.Body[]>
	sprites: IDictionary<PIXI.Sprite[]>
}
