export default ({ renderer }: PIXI.Application): void => {
	renderer.autoResize = true

	const resize = () => renderer.resize(window.innerWidth, window.innerHeight)

	window.addEventListener('resize', resize, false)

	resize()
}
