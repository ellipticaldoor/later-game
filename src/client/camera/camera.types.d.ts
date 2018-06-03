interface GameContainer {
	zIndex: number
	container: PIXI.Container
}

interface Camera {
	view: PIXI.Container
	containers: Dictionary<GameContainer>
	speed: number
}
