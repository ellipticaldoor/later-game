interface Dictionary<T> {
	[key: string]: T
}

interface Size {
	width: number
	height: number
}

interface Point {
	x: number
	y: number
}

type Image = string
declare module '*.png' {
	export default Image
}

declare module '@pixi/core'
declare module '@pixi/loaders'
declare module '@pixi/app' {
	export = PIXI
}
declare module '@pixi/settings' {
	export = PIXI
}
declare module '@pixi/constants' {
	export = PIXI
}
declare module '@pixi/sprite' {
	export = PIXI
}
declare module '@pixi/utils' {
	export = PIXI.utils
}
declare module '@pixi/math' {
	export = PIXI
}
