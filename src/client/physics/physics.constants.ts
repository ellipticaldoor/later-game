export const bodyParams: Matter.IBodyDefinition = {
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

export const renderOptions = {
	width: window.innerWidth,
	height: window.innerHeight,
	wireframes: false,
	wireframeBackground: 'transparent',
	background: 'transparent',
	hasBounds: true,
	showIds: true,
}
