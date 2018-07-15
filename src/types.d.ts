interface IDictionary<T> {
	[key: string]: T
}

interface ISize {
	width: number
	height: number
}

interface IPoint {
	x: number
	y: number
}

interface IDirection {
	x: 0 | 1 | -1
	y: 0 | 1 | -1
}

interface IClientEntity {}

interface IEntity {
	label: string
	x: number
	y: number
}
