// @ts-ignore
export const pixiMock: PIXI.Application = {
	stage: {
		addChild: jest.fn(),
	},
	ticker: {
		add: jest.fn(),
	},
	renderer: {
		screen: {
			width: 1920,
			height: 1080,
		},
	},
}
