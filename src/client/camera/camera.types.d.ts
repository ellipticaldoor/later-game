interface IGameContainer {
	name: string
	zIndex: number
	container: PIXI.Container
}

interface ICamera {
	view: PIXI.Container
	containers: IGameContainer[]
	speed: number
}
