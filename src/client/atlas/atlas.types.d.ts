type Tile =
	| 0 // Empty
	| 1 // Grass
	| 2 // Ground
	| 3 // Tree
	| 4 // TopOfTree
	| 5 // Bush

interface TileLayer {
	zIndex: number
	cols: number
	rows: number
	data: Tile[]
}

interface Atlas {
	textures: PIXI.Texture[]
	layers: Dictionary<TileLayer>
	sprites: Dictionary<PIXI.Sprite[]>
	bodies: Dictionary<Matter.Body[]>
}
