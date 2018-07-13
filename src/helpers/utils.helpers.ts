export const rand = (min: number, max: number): number =>
	((Math.random() * max) | min) + 1
