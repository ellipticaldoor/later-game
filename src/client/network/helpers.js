import { map } from 'ramda'
const COLOURS = ['blue', 'red']

// Render all the entities in the given canvas.
export const renderWorld = (canvas, entities) => {
	// Clear the canvas.
	canvas.width = canvas.width

	const ctx = canvas.getContext('2d')

	map(entity => {
		// Compute size and position.
		const radius = (canvas.height * 0.9) / 2
		const x = (entity.x / 10.0) * canvas.width

		// Draw the entity.
		ctx.beginPath()
		ctx.arc(x, canvas.height / 2, radius, 0, 2 * Math.PI, false)
		ctx.fillStyle = COLOURS[entity.entity_id]
		ctx.fill()
		ctx.lineWidth = 5
		ctx.strokeStyle = 'dark' + COLOURS[entity.entity_id]
		ctx.stroke()
	}, entities)
}
