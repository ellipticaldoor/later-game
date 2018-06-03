interface GameContainer {
	name: string
	zIndex: number
	container: PIXI.Container
}

interface Camera {
	view: PIXI.Container
	containers: GameContainer[]
	speed: number
}
