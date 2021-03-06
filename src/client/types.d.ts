type Asset = string

declare module '*.png' {
	const png: Asset
	export default png
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
