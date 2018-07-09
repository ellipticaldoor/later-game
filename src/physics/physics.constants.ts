// List of bodies that are static
export const STATIC_BODIES: BodyLabel[] = ['tile']

export const ENTITY_BODY_PARAMS: Matter.IBodyDefinition = {
	inertia: Infinity,
	friction: 0,
	frictionAir: 0.1,
	restitution: 0,
}

export const STATIC_BODIES_PARAMS: Matter.IBodyDefinition = {
	isStatic: true,
	friction: 0,
	restitution: 0,
}
