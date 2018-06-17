export const entityBodyParams: Matter.IBodyDefinition = {
	inertia: Infinity,
	friction: 0,
	frictionAir: 0.1,
	restitution: 0,
}

export const staticBodyParams: Matter.IBodyDefinition = {
	isStatic: true,
	friction: 0,
	restitution: 0,
}
