const playerInputs = {
	playerUp: { key: 'w', state: false },
	playerLeft: { key: 'a', state: false },
	playerDown: { key: 's', state: false },
	playerRight: { key: 'd', state: false },
}

const cameraInputs = {
	cameraUp: { key: 'i', state: false },
	cameraLeft: { key: 'j', state: false },
	cameraDown: { key: 'k', state: false },
	cameraRight: { key: 'l', state: false },
}

const inputs = {
	...playerInputs,
	...cameraInputs,
}

export default inputs
