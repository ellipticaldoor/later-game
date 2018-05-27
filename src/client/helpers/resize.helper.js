export default pixi => {
	pixi.renderer.autoResize = true

	const resize = () =>
		pixi.renderer.resize(window.innerWidth, window.innerHeight)

	window.addEventListener('resize', resize, false)

	resize()
}
