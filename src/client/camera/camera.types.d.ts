interface GameContainer {
	zIndex: number;
	container: PIXI.Container;
}

interface GameContainerList {
	[key: string]: GameContainer;
}

interface Camera {
	view: PIXI.Container;
	containers: GameContainerList;
	speed: number;
}
