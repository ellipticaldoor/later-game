export const Entity = () => ({
	x: 0,
	speed: 2,
	position_buffer: [],
})

export const applyInputToEntity = (input, entity) => {
	entity.x += input.press_time * entity.speed
}
